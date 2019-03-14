import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Menu, Dropdown, Button } from "antd";

export class ObjectiveSelector extends Component {
  static propTypes = {
    setSelectedObjective: PropTypes.func.isRequired,
    selectedObjective: PropTypes.shape({
      key: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      jsx: PropTypes.func.isRequired,
      mutation: PropTypes.any.isRequired,
      update: PropTypes.any.isRequired
    }),
    objectives: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
        jsx: PropTypes.func.isRequired,
        mutation: PropTypes.any.isRequired,
        update: PropTypes.any.isRequired
      })
    ).isRequired
  };

  render() {
    return (
      <>
        <Dropdown
          trigger={["click"]}
          placement="bottomRight"
          overlay={
            <Menu
              key="objectivemenu"
              onClick={e => {
                this.props.setSelectedObjective(e.item.props.obj);
              }}
            >
              {this.props.objectives.map((obj, index) => {
                return (
                  <Menu.Item obj={obj} key={index}>
                    {obj.displayName}
                  </Menu.Item>
                );
              })}
            </Menu>
          }
        >
          <Button block>
            <div style={{ float: "left" }}>
              {this.props.selectedObjective === null
                ? "Select an Objective"
                : this.props.selectedObjective.displayName}
            </div>
            <div style={{ float: "right" }}>
              <Icon type="down" />
            </div>
          </Button>
        </Dropdown>
      </>
    );
  }
}
