import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Menu, Dropdown, Button } from "antd";

export class ActionSelector extends Component {
  static propTypes = {
    setSelectedAction: PropTypes.func.isRequired,
    selectedAction: PropTypes.shape({
      key: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      jsx: PropTypes.func.isRequired,
      mutation: PropTypes.any.isRequired
    }),
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
        jsx: PropTypes.func.isRequired,
        mutation: PropTypes.any.isRequired
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
              key="actionmenu"
              onClick={e => {
                this.props.setSelectedAction(e.item.props.action);
              }}
            >
              {this.props.actions.map((action, index) => {
                return (
                  <Menu.Item action={action} key={index}>
                    {action.displayName}
                  </Menu.Item>
                );
              })}
            </Menu>
          }
        >
          <Button block>
            <div style={{ float: "left" }}>
              {this.props.selectedAction === null
                ? "Select an Action"
                : this.props.selectedAction.displayName}
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
