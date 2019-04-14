import React from "react";
import { Icon, Input, Button, Form as AntForm } from "antd";
import { withFormik, Form } from "formik";
import styled from "styled-components";

const FormItemWithSpacing = styled(AntForm.Item)`
  margin-bottom: 24px;
`;

const LoginForm = ({ values, handleChange, handleSubmit }) => (
  <Form
    style={{
      display: "flex"
    }}
  >
    <div
      style={{
        maxWidth: "300px",
        margin: "auto"
      }}
    >
      <FormItemWithSpacing>
        <Input
          name="email"
          prefix={<Icon type="mail" />}
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
      </FormItemWithSpacing>
      <AntForm.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{ width: "100%", marginBottom: "5px" }}
        >
          Log in
        </Button>
      </AntForm.Item>
    </div>
  </Form>
);

export const FormikLoginForm = withFormik({
  mapPropsToValues({ email }) {
    return {
      email: email || ""
    };
  },
  handleSubmit(values, bag) {
    console.log(values);
    //bag.props.handleSubmit();
  }
})(LoginForm);
