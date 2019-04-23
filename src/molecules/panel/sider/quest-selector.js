import { Button, Dropdown, Icon, Menu } from "antd";
import React,  { Component, Fragment } from "react";
import { QuestList } from "../../../atoms/quest-sidenav/quest-list";
import PropTypes from "prop-types";

const SelectorText = props => {
  const { quests, openQuest } = props;
  if (openQuest < 0 || !quests) {
    return "Select or Create a Quest";
  } else {
    return quests[openQuest].name.length > 16
      ? quests[openQuest].name.substring(0, 16) + "..."
      : quests[openQuest].name;
  }
};

export class QuestSelector extends Component {
  static propTypes = {
    quests: PropTypes.arrayOf(PropTypes.object),
    switchQuestHandler: PropTypes.func.isRequired,
    openQuest: PropTypes.number.isRequired,
    createQuestClick: PropTypes.func.isRequired
  };
  static defaultProps = {
    quests: []
  };

  render() {
    const {
      quests,
      switchQuestHandler,
      openQuest,
      createQuestClick
    } = this.props;
    return (
      <Fragment>
        <Dropdown
          trigger={["click"]}
          placement="bottomRight"
          overlay={
            <Menu
              onClick={({ key }) => {
                if (key !== "createQuest") {
                  switchQuestHandler({ key: key });
                }
              }}
            >
              <QuestList
                quests={quests}
                switchQuestHandler={switchQuestHandler}
              />
              <Menu.Divider />
              <Menu.Item key={"createQuest"} onClick={createQuestClick}>
                <Icon type="plus" />
                Create Quest
              </Menu.Item>
            </Menu>
          }
        >
          <Button block>
            <div style={{ float: "left" }}>
              <SelectorText quests={quests} openQuest={openQuest} />
            </div>
            <div style={{ float: "right" }}>
              <Icon type="down" />
            </div>
          </Button>
        </Dropdown>
      </Fragment>
    );
  }
}
