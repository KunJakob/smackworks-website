import React,  { Component, Fragment } from "react";
import { Menu } from "antd";
import { Icon } from "antd";
import PropTypes from "prop-types";

export class CreateActionButton extends Component {
  static propTypes = {
    questID: PropTypes.string.isRequired,
    stageIndex: PropTypes.number.isRequired,
    objectiveIndex: PropTypes.number.isRequired,
    createActionClick: PropTypes.func.isRequired
  };

  render() {
    const {
      questID,
      stageIndex,
      createActionClick,
      objectiveIndex,
      ...props
    } = this.props;
    return (
      <Fragment>
        <Menu.Item
          key={questID + stageIndex + objectiveIndex + "createAction"}
          {...props}
          onClick={() =>
            createActionClick({
              questID: questID,
              stageIndex: stageIndex,
              objectiveIndex: objectiveIndex
            })
          }
        >
          <Icon type="plus" />
          Create Action
        </Menu.Item>
      </Fragment>
    );
  }
}
