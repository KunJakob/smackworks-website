import React, { Component } from "react";
import { Menu } from "antd";
import { Icon } from "antd";
import PropTypes from "prop-types";

export class CreateConditionButton extends Component {
  static propTypes = {
    questID: PropTypes.string.isRequired,
    stageIndex: PropTypes.number.isRequired,
    objectiveIndex: PropTypes.number.isRequired,
    createConditionClick: PropTypes.func.isRequired
  };

  render() {
    const {
      questID,
      stageIndex,
      createConditionClick,
      objectiveIndex,
      ...props
    } = this.props;
    return (
      <React.Fragment>
        <Menu.Item
          key={questID + stageIndex + objectiveIndex + "createCondition"}
          {...props}
          onClick={() =>
            createConditionClick({
              questID: questID,
              stageIndex: stageIndex,
              objectiveIndex: objectiveIndex
            })
          }
        >
          <Icon type="plus" />
          Create Condition
        </Menu.Item>
      </React.Fragment>
    );
  }
}
