import { Icon, Modal, Steps } from "antd";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { USER_QUESTS_QUERY } from "../../../../graphql/queriesandmutations";
import { ActionSelector } from "./action-selector";
import { CreateActionForm } from "./create-action";
import { observer } from "mobx-react";

const Step = Steps.Step;

@observer
class CreateActionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questID: this.props.questID,
      stageIndex: this.props.stageIndex,
      objectiveIndex: this.props.objectiveIndex,
      step: 0,
      selectedAction: null
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

  goToActionSelector = () => {
    this.setState({
      step: 0,
      selectedAction: null
    });
  };

  setSelectedAction = selectedAction => {
    this.setState({
      step: 1,
      selectedAction: selectedAction
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
        title="Create Action"
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
          <ActionSelector
            selectedAction={this.state.selectedAction}
            setSelectedAction={this.setSelectedAction}
          />
        )}
        {this.state.step === 1 && (
          <Mutation
            update={(client, { data }) => {
              const { user } = client.readQuery({ query: USER_QUESTS_QUERY });
              const createAction = data[Object.keys(data)[0]];
              for (let i = 0; i < user.quests.length; i++) {
                const quest = user.quests[i];

                if (quest.id === questID) {
                  user.quests[i].stages[stageIndex].objectives[
                    objectiveIndex
                  ].actions.push(createAction);
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
            mutation={this.state.selectedAction.mutation}
          >
            {createAction => (
              <CreateActionForm
                extraFormFields={this.state.selectedAction.jsx}
                successCallback={values => {
                  const variables = {};
                  for (let key in values) {
                    variables[key] = values[key];
                  }
                  variables.questID = questID;
                  variables.stageIndex = stageIndex;
                  variables.objectiveIndex = objectiveIndex;
                  console.log("vars", variables);
                  createAction({
                    variables
                  }).then(() => {
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

export { CreateActionModal };
