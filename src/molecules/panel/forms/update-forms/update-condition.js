import { Button, Form as AntForm, Icon, Switch } from "antd";
import { Form, withFormik } from "formik";
import PropTypes from "prop-types";
import withFormikAutoSave from "withFormikAutoSave";
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

const FormikEnhancer = withFormik({
  mapPropsToValues({ inverted }) {
    return {
      inverted: inverted || false
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

export const UpdateConditionForm = withFormikAutoSave({
  onSave: (values, props) => {
    console.log(values, props);
    return props.successCallback(values); // must return a promise
  }
})(FormikEnhancer);
