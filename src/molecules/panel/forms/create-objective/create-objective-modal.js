import { Icon, Modal, Steps } from "antd";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { ObjectiveSelector } from "./objective-selector";
import { CreateObjectiveForm } from "./create-objective";
import { Mutation } from "react-apollo";
import { USER_QUESTS_QUERY } from "../../../../graphql/queriesandmutations";
import { client } from "../../../..";

const Step = Steps.Step;

export class CreateObjectiveModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questID: this.props.questID,
      stageIndex: this.props.stageIndex,
      step: 0,
      selectedObjective: null
    };
  }
  static propTypes = {
    questID: PropTypes.string.isRequired,
    stageIndex: PropTypes.number.isRequired,
    visible: PropTypes.bool.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  goToObjectiveSelector = () => {
    this.setState({
      step: 0,
      selectedObjective: null
    });
  };

  setSelectedObjective = selectedObjective => {
    this.setState({
      step: 1,
      selectedObjective: selectedObjective
    });
  };

  render() {
    const { visible, onOk, onCancel, stageIndex, questID } = this.props;
    return (
      <Modal
        destroyOnClose={true}
        title="Create Objective"
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
          <ObjectiveSelector
            selectedObjective={this.state.selectedObjective}
            setSelectedObjective={this.setSelectedObjective}
          />
        )}
        {this.state.step === 1 && (
          <Mutation
            update={(cache, { data }) => {
              const { user } = client.readQuery({ query: USER_QUESTS_QUERY });
              console.log("USER:", user);
              const createObjective = data[Object.keys(data)[0]];
              for (let i = 0; i < user.quests.length; i++) {
                const quest = user.quests[i];

                if (quest.id === questID) {
                  console.log("FOUND IT");
                  user.quests[i].stages[stageIndex].objectives.push(
                    createObjective
                  );
                }
              }

              console.log("createObjective:", createObjective);
              console.log("DATA:", data);
              console.log("MERGED:", user);
              client.writeQuery({
                query: USER_QUESTS_QUERY,
                data: {
                  user: user
                }
              });
              client.reFetchObservableQueries();
            }}
            mutation={this.state.selectedObjective.mutation}
          >
            {(createObjective, { data }) => (
              <CreateObjectiveForm
                extraFormFields={this.state.selectedObjective.jsx}
                successCallback={values => {
                  const variables = {};
                  for (let key in values) {
                    variables[key] = values[key];
                  }
                  variables.questID = questID;
                  variables.stageIndex = stageIndex;
                  console.log("vars", variables);
                  createObjective({
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
