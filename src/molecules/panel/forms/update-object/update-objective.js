import { Button, Icon, Input, Switch } from "antd";
import { Form, withFormik } from "formik";
import { Form as AntForm } from "antd";
import React, { Component } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import PropTypes from "prop-types";

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
            <div>Completions</div>
            <Input
              name="completions"
              placeholder="1"
              autoComplete="off"
              type="number"
              value={this.props.values.completions}
              onChange={this.props.handleChange}
            />
          </FormItemWithSpacing>
          <FormItemWithSpacing>
            <div>Description</div>
            <Input
              name="description"
              placeholder="Kill the pigs at Old Man Billy's Farm"
              autoComplete="off"
              value={this.props.values.description}
              onChange={this.props.handleChange}
            />
          </FormItemWithSpacing>
          <FormItemWithSpacing>
            <div>Secret Objective</div>
            <Switch
              name="isSecret"
              checked={this.props.values.isSecret}
              onChange={value => {
                this.props.setFieldValue("isSecret", value);
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
        </div>
      </Form>
    );
  }
}

const FormikCreateObjectiveForm = withFormik({
  mapPropsToValues({ completions, description, isSecret }) {
    return {
      completions: completions || 1,
      description: description || "",
      isSecret: isSecret || false
    };
  },
  handleSubmit(values, bag) {
    const { setErrors } = bag;
    /**@todo change this error condition to reflect a gql error */
    if (false === 0) {
      setErrors(["Mission Failed. We'll get them next time boys"]);
    }
    bag.props.successCallback(values);
    console.log(values);
  }
})(RawCreateObjectiveForm);

export const CreateObjectiveForm = withRouter(FormikCreateObjectiveForm);
