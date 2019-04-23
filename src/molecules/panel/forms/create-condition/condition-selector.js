import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Icon, Menu, Dropdown, Button } from "antd";
import { conditionFormState } from "../../../../state/form-selector";

export class ConditionSelector extends Component {
  static propTypes = {
    setSelectedCondition: PropTypes.func.isRequired,
    selectedCondition: PropTypes.shape({
      key: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      jsx: PropTypes.func.isRequired,
      mutation: PropTypes.any.isRequired,
      update: PropTypes.any.isRequired
    })
  };

  render() {
    return (
      <Fragment>
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
              {conditionFormState.formArray.map((condition, index) => {
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
      </Fragment>
    );
  }
}
