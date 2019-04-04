import React from "react";
import { Icon, Input, Button } from "antd";
import { withFormik, Form } from "formik";
import FormItem from "antd/lib/form/FormItem";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { signup } from "../../config/common-fetches";
import { AuthService } from "../../services/authservice";

const FormItemWithSpacing = styled(FormItem)`
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
      <FormItem>
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
      </FormItem>
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
        //TODO handle rejected login
      } else {
        AuthService.login(values.email, values.password).then(loggedIn => {
          if (loggedIn) {
            bag.props.history.push("/panel");
          }
        });
      }
    });
  }
})(SignUpForm);
