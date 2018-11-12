import React from 'react';
import { Icon, Input, Button } from 'antd';
import { withFormik, Form } from 'formik';
import FormItem from 'antd/lib/form/FormItem';
import styled from 'styled-components';

const FormItemWithSpacing = styled(FormItem)`
margin-bottom: 24px;
`

const LoginForm = ({
  values,
  handleChange,
  handleSubmit
}) => (
    <Form style={{
      display: 'flex',
    }}
    >
      <div style={{
        maxWidth: '300px',
        margin: 'auto'
      }}>
        <FormItemWithSpacing>
          <Input
            name='email'
            prefix={<Icon type="mail" />}
            placeholder="Email"
            autoComplete="username"
            value={values.email}
            onChange={handleChange} />
        </FormItemWithSpacing>
        <FormItemWithSpacing>
          <Input name='password'
            prefix={<Icon type="lock" />}
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange} />
        </FormItemWithSpacing>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%', marginBottom: '5px' }}>
            Log in
          </Button>
          Or <a href="/">register now!</a>
          <a className="login-form-forgot" style={{ float: 'right' }} href="/">Forgot password</a>
        </FormItem>
      </div>
    </Form>
  );

export const FormikLoginForm = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || '',
      password: password || ''
    }
  },
  handleSubmit(values, bag) {
    console.log(values);
    //bag.props.handleSubmit();
  }
})(LoginForm);