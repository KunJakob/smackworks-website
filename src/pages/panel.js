import { Layout } from "antd";
import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import { PanelSider } from "./../organisms/panel/sider";
import { PanelTopBar } from "./../organisms/panel/panel-topbar";
import { USER_QUESTS_QUERY } from "../graphql/queriesandmutations";
import Loading from "./loading";
import { CreateConditionModal } from "../molecules/panel/forms/create-condition/create-condition-modal";
import {
  objectiveFormService,
  conditionFormService,
  actionFormService
} from "../state/form-selector";
import { CreateActionModal } from "../molecules/panel/forms/create-action/create-action-modal";
import { CreateObjectiveModal } from "../molecules/panel/forms/create-objective/create-objective-modal";
import { CreateQuestModal } from "../molecules/panel/forms/create-quest-modal";
import { Editor } from "../molecules/panel/editor";

const { Footer, Sider, Content, Header } = Layout;

/*const PaddedContentContainer = styled.div`
display: block;
padding-top: 60px;
padding-left: 20px;
width: 100%;
max-width: 100%;
`
*/
const SiderHeader = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 25px;
  padding-left: 11px;
`;

export default class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openQuest: -1,
      questID: "",
      stageIndex: -1,
      showCreateQuest: false,
      showCreateObjective: false,
      objectiveIndex: -1,
      actionIndex: -1,
      conditionIndex: -1,
      showCreateCondition: false,
      showCreateAction: false
    };
  }

  createQuestClick = e => {
    this.setState({
      showCreateQuest: true
    });
  };
  hideCreateQuest = () => {
    this.setState({
      showCreateQuest: false
    });
  };
  finishCreateQuest = () => {
    this.setState({
      showCreateQuest: false,
      openQuest: this.props.data.user.quests.length - 1
    });
  };
  createObjectiveClick = values => {
    this.setState({
      questID: values.questID,
      stageIndex: values.stageIndex,
      showCreateObjective: true
    });
  };
  hideCreateObjective = () => {
    this.setState({
      showCreateObjective: false
    });
  };
  createConditionClick = values => {
    this.setState({
      questID: values.questID,
      stageIndex: values.stageIndex,
      objectiveIndex: values.objectiveIndex,
      showCreateCondition: true
    });
  };
  hideCreateCondition = () => {
    this.setState({
      showCreateCondition: false
    });
  };
  createActionClick = values => {
    this.setState({
      questID: values.questID,
      stageIndex: values.stageIndex,
      objectiveIndex: values.objectiveIndex,
      showCreateAction: true
    });
  };
  hideCreateAction = () => {
    this.setState({
      showCreateAction: false
    });
  };

  switchQuestHandler = e => {
    console.log(e);
    this.setState({
      openQuest: parseInt(e.key),
      stageIndex: -1,
      actionIndex: -1,
      conditionIndex: -1
    });
  };

  switchStageHandler = (questIndex, stageIndex) => {
    console.log("stage", stageIndex);
    this.setState({
      openQuest: questIndex,
      stageIndex: stageIndex,
      objectiveIndex: -1,
      actionIndex: -1,
      conditionIndex: -1
    });
  };

  switchObjectiveHandler = (questIndex, stageIndex, objectiveIndex) => {
    console.log("objective", objectiveIndex);
    this.setState({
      openQuest: questIndex,
      stageIndex: stageIndex,
      objectiveIndex: objectiveIndex,
      actionIndex: -1,
      conditionIndex: -1
    });
  };

  switchConditionHandler = (
    questIndex,
    stageIndex,
    objectiveIndex,
    conditionIndex
  ) => {
    console.log("condition", conditionIndex);
    this.setState({
      openQuest: questIndex,
      stageIndex: stageIndex,
      objectiveIndex: objectiveIndex,
      conditionIndex: conditionIndex,
      actionIndex: -1
    });
  };
  switchActionHandler = (
    questIndex,
    stageIndex,
    objectiveIndex,
    actionIndex
  ) => {
    console.log("action", actionIndex);
    this.setState({
      openQuest: questIndex,
      stageIndex: stageIndex,
      objectiveIndex: objectiveIndex,
      actionIndex: actionIndex,
      conditionIndex: -1
    });
  };

  render() {
    return (
      <Query query={USER_QUESTS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) {
            console.log(error.message);
            return null;
          }
          return (
            <>
              <div>
                <CreateQuestModal
                  visible={this.state.showCreateQuest}
                  onOk={this.finishCreateQuest}
                  onCancel={this.hideCreateQuest}
                />
                <CreateObjectiveModal
                  visible={this.state.showCreateObjective}
                  questID={this.state.questID}
                  stageIndex={this.state.stageIndex}
                  onOk={this.hideCreateObjective}
                  onCancel={this.hideCreateObjective}
                  objectives={objectiveFormService.formArray}
                />
                <CreateConditionModal
                  visible={this.state.showCreateCondition}
                  questID={this.state.questID}
                  stageIndex={this.state.stageIndex}
                  objectiveIndex={this.state.objectiveIndex}
                  onOk={this.hideCreateCondition}
                  onCancel={this.hideCreateCondition}
                  conditions={conditionFormService.formArray}
                />
                <CreateActionModal
                  visible={this.state.showCreateAction}
                  questID={this.state.questID}
                  stageIndex={this.state.stageIndex}
                  objectiveIndex={this.state.objectiveIndex}
                  onOk={this.hideCreateAction}
                  onCancel={this.hideCreateAction}
                  actions={actionFormService.formArray}
                />
              </div>
              <Layout>
                <Sider width={200} height="100vh">
                  <SiderHeader style={{ height: "50px" }}>
                    <img
                      src="charizard64_64.png"
                      alt="logo"
                      height="40px"
                      width="40px"
                      style={{ marginRight: "5px" }}
                    />
                    ReQuest
                  </SiderHeader>
                  <PanelSider
                    data={data}
                    openQuest={this.state.openQuest}
                    switchQuestHandler={this.switchQuestHandler}
                    switchStageHandler={this.switchStageHandler}
                    switchObjectiveHandler={this.switchObjectiveHandler}
                    switchActionHandler={this.switchActionHandler}
                    switchConditionHandler={this.switchConditionHandler}
                    createQuestClick={this.createQuestClick}
                    createObjectiveClick={this.createObjectiveClick}
                    createConditionClick={this.createConditionClick}
                    createActionClick={this.createActionClick}
                  />
                </Sider>
                <Layout>
                  <Header>
                    <PanelTopBar appname="reQuest" />
                  </Header>
                  <Content
                    style={{
                      width: "100%",
                      minWidth: "100%"
                    }}
                  >
                    <Editor
                      questIndex={this.state.openQuest}
                      stageIndex={this.state.stageIndex}
                      objectiveIndex={this.state.objectiveIndex}
                      actionIndex={this.state.actionIndex}
                      conditionIndex={this.state.conditionIndex}
                      quests={data.user.quests}
                    />
                  </Content>
                  <Footer
                    style={{
                      textAlign: "center",
                      fontSize: "18px"
                    }}
                  >
                    <div>Made with ❤ by Smack</div>
                  </Footer>
                </Layout>
              </Layout>
            </>
          );
        }}
      </Query>
    );
  }
}
