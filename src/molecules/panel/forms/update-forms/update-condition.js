import { Button, Form as AntForm, Icon, Switch } from "antd";
import { Form, withFormik } from "formik";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import { AutoSave } from "./auto-save";

const FormItemWithSpacing = styled(AntForm.Item)`
  margin-bottom: 12px;
`;

class RawUpdateConditionForm extends Component {
  static propTypes = {
    questFormFieldContainer: PropTypes.object.isRequired,
    successCallback: PropTypes.func.isRequired,
    conditionIndex: PropTypes.number.isRequired
  };
  state = {};

  render() {
    const ExtraFormFields = this.props.questFormFieldContainer.jsx;
    return (
      <Form
        style={{
          paddingLeft: "50px"
        }}
      >
        <FormItemWithSpacing>
          <div>Inverted</div>
          <Switch
            name="inverted"
            checked={this.props.values.inverted}
            onChange={value => {
              this.props.setFieldValue("inverted", value);
            }}
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="close" />}
          />
        </FormItemWithSpacing>
        <ExtraFormFields
          values={this.props.values}
          handleChange={this.props.handleChange}
          setFieldValue={this.props.setFieldValue}
        />
        <AntForm.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ marginBottom: "5px" }}
          >
            Submit
          </Button>
        </AntForm.Item>
      </Form>
    );
  }
}

export const UpdateConditionForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues(props) {
    const values = props.currentValues;
    values["conditionIndex"] = props.conditionIndex;
    return values;
  },
  handleSubmit(values, bag) {
    bag.props.successCallback(values);
    console.log(values);
  }
})(RawUpdateConditionForm);
