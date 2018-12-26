import { Button, Form as AntForm, Input, Tooltip } from "antd";
import { Form, withFormik } from "formik";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";

const FormItemWithSpacing = styled(AntForm.Item)`
  margin-bottom: 24px;
`;

class RawCreateObjectiveForm extends Component {
  static propTypes = {
    extraFormFields: PropTypes.func.isRequired,
    successCallback: PropTypes.func.isRequired
  };
  state = {};

  render() {
    const ExtraFormFields = this.props.extraFormFields;
    return (
      <Form
        style={{
          display: "flex"
        }}
      >
        <div
          style={{
            maxWidth: "750px",
            width: "100%",
            margin: "auto"
          }}
        >
          <FormItemWithSpacing>
            <div>
              <Tooltip title="How long in seconds before this action should be executed">
                <span>Delay</span>
              </Tooltip>
            </div>
            <Input
              name="delay"
              onChange={this.props.handleChange}
              type="number"
              autoComplete="off"
              placeholder={0}
              value={this.props.values.delay}
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
              style={{ width: "100%", marginBottom: "5px" }}
            >
              Create
            </Button>
          </AntForm.Item>
        </div>
      </Form>
    );
  }
}

export const CreateActionForm = withFormik({
  mapPropsToValues({ delay }) {
    return {
      delay: delay || 0
    };
  },
  handleSubmit(values, bag) {
    const { setErrors } = bag;
    /**@todo change this error action to reflect a gql error */
    if (false === 0) {
      setErrors(["Mission Failed. We'll get them next time boys"]);
    }
    bag.props.successCallback(values);
    console.log(values);
  }
})(RawCreateObjectiveForm);
