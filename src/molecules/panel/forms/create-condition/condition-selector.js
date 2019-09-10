import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Menu, Dropdown, Button } from "antd";

export class ConditionSelector extends Component {
  static propTypes = {
    setSelectedCondition: PropTypes.func.isRequired,
    selectedCondition: PropTypes.shape({
      key: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      jsx: PropTypes.func.isRequired,
      mutation: PropTypes.any.isRequired,
      update: PropTypes.any.isRequired
    }),
    conditions: PropTypes.arrayOf(
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
      <React.Fragment>
        <Dropdown
          trigger={["click"]}
          placement="bottomRight"
          overlay={
            <Menu
              key="conditionmenu"
              onClick={e => {
                this.props.setSelectedCondition(e.item.props.condition);
              }}
            >
              {this.props.conditions.map((condition, index) => {
                return (
                  <Menu.Item condition={condition} key={index}>
                    {condition.displayName}
                  </Menu.Item>
                );
              })}
            </Menu>
          }
        >
          <Button block>
            <div style={{ float: "left" }}>
              {this.props.selectedCondition === null
                ? "Select a Condition"
                : this.props.selectedCondition.displayName}
            </div>
            <div style={{ float: "right" }}>
              <Icon type="down" />
            </div>
          </Button>
        </Dropdown>
      </React.Fragment>
    );
  }
}
