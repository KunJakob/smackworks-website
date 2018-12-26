import React, { Component } from "react";
import { Menu } from "antd";
import { Scrollbars } from "react-custom-scrollbars";

export class QuestList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { quests, switchQuestHandler, key, ...props } = this.props;
    return (
      <Scrollbars
        style={{
          height: "35vh",
          width: "auto"
        }}
      >
        {quests.map((quest, index) => {
          return (
            <Menu.Item {...props} key={index} eventKey={"" + index}>
              {quest.name.length > 25
                ? quest.name.substring(0, 25) + "..."
                : quest.name}
            </Menu.Item>
          );
        })}
      </Scrollbars>
    );
  }
}
