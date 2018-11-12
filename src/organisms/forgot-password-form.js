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
            value={values.email}
            onChange={handleChange} />
        </FormItemWithSpacing>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%', marginBottom: '5px' }}>
            Log in
          </Button>
        </FormItem>
      </div>
    </Form>
  );

export const FormikLoginForm = withFormik({
  mapPropsToValues({ email }) {
    return {
      email: email || ''
    }
  },
  handleSubmit(values, bag) {
    console.log(values);
    //bag.props.handleSubmit();
  }
})(LoginForm);