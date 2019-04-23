import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Icon, Menu, Dropdown, Button } from "antd";
import { objectiveFormState } from "../../../../state/form-selector";

export class ObjectiveSelector extends Component {
  static propTypes = {
    setSelectedObjective: PropTypes.func.isRequired,
    selectedObjective: PropTypes.shape({
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
              key="objectivemenu"
              onClick={e => {
                this.props.setSelectedObjective(e.item.props.obj);
              }}
            >
              {objectiveFormState.formArray.map((obj, index) => {
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
      </Fragment>
    );
  }
}
