import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Icon, Menu, Dropdown, Button } from "antd";
import { observer } from "mobx-react";
import { actionFormState } from "../../../../state/form-selector";

@observer
class ActionSelector extends Component {
  static propTypes = {
    setSelectedAction: PropTypes.func.isRequired,
    selectedAction: PropTypes.shape({
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
              key="actionmenu"
              onClick={e => {
                this.props.setSelectedAction(e.item.props.action);
              }}
            >
              {actionFormState.formArray.map((action, index) => {
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
      </Fragment>
    );
  }
}

export { ActionSelector };
