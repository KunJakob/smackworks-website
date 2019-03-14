import React, { Component } from "react";
import { QuestNavigationMenu } from "../../molecules/panel/sider/quest-navigation-menu";
import { QuestSelector } from "../../molecules/panel/sider/quest-selector";
import PropTypes from "prop-types";

const bgColor = "#2f3136";

export class PanelSider extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    switchQuestHandler: PropTypes.func.isRequired,
    switchStageHandler: PropTypes.func.isRequired,
    switchObjectiveHandler: PropTypes.func.isRequired,
    switchActionHandler: PropTypes.func.isRequired,
    switchConditionHandler: PropTypes.func.isRequired,
    openQuest: PropTypes.number.isRequired,
    createQuestClick: PropTypes.func.isRequired,
    createObjectiveClick: PropTypes.func.isRequired,
    createConditionClick: PropTypes.func.isRequired,
    createActionClick: PropTypes.func.isRequired
  };

  render() {
    const {
      data,
      switchQuestHandler,
      openQuest,
      createQuestClick,
      createObjectiveClick,
      createConditionClick,
      createActionClick,
      switchStageHandler,
      switchObjectiveHandler,
      switchActionHandler,
      switchConditionHandler
    } = this.props;
    return (
      <>
        <div
          style={{
            borderBottomStyle: "solid",
            borderBottomWidth: "2px",
            borderBottomColor: "black",
            textAlign: "center",
            height: "auto",
            borderRightWidth: "6px",
            borderRightColor: "black",
            backgroundColor: bgColor
          }}
        >
          <QuestSelector
            quests={data.user.quests}
            switchQuestHandler={switchQuestHandler}
            openQuest={openQuest}
            createQuestClick={createQuestClick}
          />
          {openQuest >= 0 && (
            <QuestNavigationMenu
              quest={data.user.quests[openQuest]}
              questIndex={openQuest}
              createObjectiveClick={createObjectiveClick}
              createConditionClick={createConditionClick}
              createActionClick={createActionClick}
              switchStageHandler={switchStageHandler}
              switchObjectiveHandler={switchObjectiveHandler}
              switchActionHandler={switchActionHandler}
              switchConditionHandler={switchConditionHandler}
            />
          )}
        </div>
      </>
    );
  }
}
