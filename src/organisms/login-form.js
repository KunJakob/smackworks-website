import React, { Component } from 'react';
import { Icon, Input, Button } from 'antd';
import { withFormik, Form } from 'formik';
import FormItem from 'antd/lib/form/FormItem';
import styled from 'styled-components';
import { withRouter} from 'react-router';
import { AuthService } from './../services/authservice';


const FormItemWithSpacing = styled(FormItem)`
margin-bottom: 24px;
`

class DumbLoginForm extends Component {
  state = {}
  render() {
    return (
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
              value={this.props.values.email}
              onChange={this.props.handleChange} />
          </FormItemWithSpacing>
          <FormItemWithSpacing>
            <Input name='password'
              prefix={<Icon type="lock" />}
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={this.props.values.password}
              onChange={this.props.handleChange} />
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
    )
  }
}



const FormikLoginForm = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || '',
      password: password || ''
    }
  },
  handleSubmit(values, bag) {
    const { setErrors} = bag;
    AuthService.login(values.email, values.password).then((isAuth, message) => {
      if (isAuth) bag.props.history.push('/panel');
      else setErrors([message]);
    })

    console.log(values.email);
  }
})(DumbLoginForm);

export const LoginForm = withRouter(FormikLoginForm);