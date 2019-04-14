import React from "react";
import { Icon, Input, Button, Form as AntForm } from "antd";
import { withFormik, Form } from "formik";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { signup } from "../../config/common-fetches";

const FormItemWithSpacing = styled(AntForm.Item)`
  margin-bottom: 24px;
`;

const SignUpForm = ({ values, handleChange, handleSubmit }) => (
  <Form
    style={{
      display: "flex"
    }}
  >
    <div
      style={{
        width: "350px",
        margin: "auto"
      }}
    >
      <FormItemWithSpacing>
        <Input
          name="email"
          autoComplete="email"
          prefix={<Icon type="mail" />}
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
      </FormItemWithSpacing>
      <FormItemWithSpacing>
        <Input
          name="password"
          prefix={<Icon type="lock" />}
          type="password"
          autoComplete="off"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
      </FormItemWithSpacing>
      <FormItemWithSpacing>
        <Input
          name="confirmPassword"
          prefix={<Icon type="lock" />}
          type="password"
          autoComplete="off"
          placeholder="Confirm Password"
          value={values.confirmPassword}
          onChange={handleChange}
        />
      </FormItemWithSpacing>
      <AntForm.Item>
        <div style={{ textAlign: "center" }}>
          By clicking Sign Up you agree to the{" "}
          <Link to="/tos">Terms of Service</Link>
        </div>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%", marginBottom: "5px", marginTop: "8px" }}
        >
          Sign Up
        </Button>
      </AntForm.Item>
    </div>
  </Form>
);

export const FormikSignUpForm = withFormik({
  mapPropsToValues({ email, password, confirmPassword }) {
    return {
      email: email || "",
      password: password || "",
      confirmPassword: confirmPassword || ""
    };
  },
  handleSubmit(values, bag) {
    signup(values.email, values.password).then(response => {
      if (!response.success) {
        bag.props.failedSignUp(response.message);
      } else {
        bag.props.validSignUp();
      }
    });
  }
})(SignUpForm);
