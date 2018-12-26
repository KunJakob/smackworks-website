import React, { Component } from 'react';
import { Modal } from 'antd';
import { LoginForm } from './login-form';

export class LoginModal extends Component {
  render() {
    const { visible, onOk, onCancel } = this.props;
    return (
      <Modal
        title='Login'
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        footer={null}
        style={{
          paddingBottom: '0px',
          maxWidth: '300px'
        }}
      >
        <LoginForm />
      </Modal>
    );
  }
}