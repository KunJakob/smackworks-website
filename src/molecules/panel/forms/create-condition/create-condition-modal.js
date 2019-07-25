import { Icon, Modal, Steps } from "antd";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { USER_QUESTS_QUERY } from "../../../../graphql/queriesandmutations";
import { ConditionSelector } from "./condition-selector";
import { CreateConditionForm } from "./create-condition";
import { client } from "../../../..";

const Step = Steps.Step;

export class CreateConditionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questID: this.props.questID,
      stageIndex: this.props.stageIndex,
      objectiveIndex: this.props.objectiveIndex,
      step: 0,
      selectedCondition: null
    };
  }
  static propTypes = {
    questID: PropTypes.string.isRequired,
    stageIndex: PropTypes.number.isRequired,
    objectiveIndex: PropTypes.number.isRequired,
    visible: PropTypes.bool.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  goToConditionSelector = () => {
    this.setState({
      step: 0,
      selectedCondition: null
    });
  };

  setSelectedCondition = selectedCondition => {
    this.setState({
      step: 1,
      selectedCondition: selectedCondition
    });
  };

  render() {
    const {
      visible,
      onOk,
      onCancel,
      stageIndex,
      objectiveIndex,
      questID
    } = this.props;
    return (
      <Modal
        destroyOnClose={true}
        title="Create Condition"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        footer={null}
      >
        <Steps>
          <Step
            status={this.state.step === 0 ? "process" : "finish"}
            title="Select Type"
            icon={<Icon type="user" />}
          />
          <Step
            status={
              this.state.step === 0
                ? "wait"
                : this.state.step === 1
                ? "process"
                : "finish"
            }
            title="Configure"
            icon={<Icon type="solution" />}
          />
          <Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
        </Steps>
        {this.state.step === 0 && (
          <ConditionSelector
            selectedCondition={this.state.selectedCondition}
            setSelectedCondition={this.setSelectedCondition}
          />
        )}
        {this.state.step === 1 && (
          <Mutation
            update={(cache, { data }) => {
              const { user } = client.readQuery({ query: USER_QUESTS_QUERY });
              const createCondition = data[Object.keys(data)[0]];
              for (let i = 0; i < user.quests.length; i++) {
                const quest = user.quests[i];

                if (quest.id === questID) {
                  user.quests[i].stages[stageIndex].objectives[
                    objectiveIndex
                  ].conditions.push(createCondition);
                }
              }
              client.writeQuery({
                query: USER_QUESTS_QUERY,
                data: {
                  user: user
                }
              });
              client.reFetchObservableQueries();
            }}
            mutation={this.state.selectedCondition.mutation}
          >
            {(createCondition, { data }) => (
              <CreateConditionForm
                extraFormFields={this.state.selectedCondition.jsx}
                successCallback={values => {
                  const variables = {};
                  for (let key in values) {
                    variables[key] = values[key];
                  }
                  variables.questID = questID;
                  variables.stageIndex = stageIndex;
                  variables.objectiveIndex = objectiveIndex;
                  createCondition({
                    variables
                  }).then(res => {
                    onOk();
                  });
                }}
              />
            )}
          </Mutation>
        )}
      </Modal>
    );
  }
}
