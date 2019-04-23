import React,  { Component, Fragment } from "react";
import styled from "styled-components";
import { CoverPageTemplate } from "./../template/coverpage-template";
import { FormikSignUpForm } from "./../organisms/landingpage/signup-form";

const Heading = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-size: 48px;
`;

const Paragraph = styled.div`
  display: block;
  margin: auto auto;
  text-align: center;
  font-size: 24px;
`;

export default class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registered: false,
      errorMessage: ""
    };
  }

  validSignUp() {}
  failedSignUp(message) {
    this.setState({
      errorMessage: message
    });
  }
  render() {
    return (
      <CoverPageTemplate>
        {!this.state.registed ? (
          <Fragment>
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <Heading>Sign Up to SmackWorks</Heading>
            </div>
            <FormikSignUpForm
              validSignUp={this.validSignUp}
              failedSignUp={this.failedSignUp}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Heading>Registration received!</Heading>
            <Paragraph>
              An email with a link to finish registration has been sent to you.
              Please check your spam folder if you cannot find it.
            </Paragraph>
          </Fragment>
        )}
      </CoverPageTemplate>
    );
  }
}
