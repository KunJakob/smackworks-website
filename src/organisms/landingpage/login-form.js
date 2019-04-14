import React, { Component } from "react";
import { Icon, Input, Button, Form as AntForm } from "antd";
import { withFormik, Form } from "formik";
import styled from "styled-components";
import { withRouter } from "react-router";
import { authState } from "../../state/auth";
import { observer } from "mobx-react";
const FormItemWithSpacing = styled(AntForm.Item)`
  margin-bottom: 24px;
`;
@observer
class DumbLoginForm extends Component {
  state = {};
  render() {
    return (
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
              autoComplete="username"
              value={this.props.values.email}
              onChange={this.props.handleChange}
            />
          </FormItemWithSpacing>
          <FormItemWithSpacing>
            <Input
              name="password"
              prefix={<Icon type="lock" />}
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={this.props.values.password}
              onChange={this.props.handleChange}
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
            Or <a href="/">register now!</a>
            <a
              className="login-form-forgot"
              style={{ float: "right" }}
              href="/"
            >
              Forgot password
            </a>
          </AntForm.Item>
        </div>
      </Form>
    );
  }
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || "",
      password: password || ""
    };
  },
  handleSubmit(values, bag) {
    authState.login(values.email, values.password);
  }
})(DumbLoginForm);

export const LoginForm = withRouter(FormikLoginForm);
