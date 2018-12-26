import React, { Component } from "react";
import { Menu } from "antd";
import { Icon } from "antd";
import PropTypes from "prop-types";

export class CreateObjectiveButton extends Component {
  static propTypes = {
    questID: PropTypes.string.isRequired,
    stageIndex: PropTypes.number.isRequired,
    createObjectiveClick: PropTypes.func.isRequired
  };

  render() {
    const { questID, stageIndex, createObjectiveClick, ...props } = this.props;
    return (
      <>
        <Menu.Item
          key={questID + stageIndex + "createObjective"}
          {...props}
          onClick={() =>
            createObjectiveClick({
              questID: questID,
              stageIndex: stageIndex
            })
          }
        >
          <Icon type="plus" />
          Create Objective
        </Menu.Item>
      </>
    );
  }
}
