import React, { Component } from 'react';
import { FormikSignUpForm } from './../organisms/signup-form';
import styled from 'styled-components';

const Heading = styled.div`
display: block;
margin-left: auto;
margin-right: auto;
text-align: center;
font-size: 48px;
`

export class SignupPage extends Component {
  render() {
    return (
      <div>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <Heading>Sign Up to SmackWorks</Heading>
        </div>
        <FormikSignUpForm
          onSubmit={() => {
            console.log('signed up');
          }}
        />
      </div>
    );
  }
}
