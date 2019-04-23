import { Layout } from "antd";
import React, { Component } from "react";
import styled from "styled-components";
import { LoginModal } from "./../organisms/landingpage/login-modal";
import { Navbar } from "./../organisms/landingpage/coverpage-navbar";
import { AuthState } from "./../state/auth";
import { withRouter } from "react-router";
import { observer } from "mobx-react";

const PaddedContentContainer = styled.div`
  padding-top: 87px;
`;

@observer
class RawCoverPageTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignIn: false
    };
  }
  signInClick = () => {
    if (AuthState.isAuthenticated) {
      this.props.history.push("/panel");
      return;
    }
    this.setState({
      showSignIn: true
    });
  };
  hideModal = () => {
    this.setState({
      showSignIn: false
    });
  };

  render() {
    return (
      <div>
        <LoginModal
          visible={this.state.showSignIn}
          onOk={this.hideModal}
          onCancel={this.hideModal}
        />
        <Layout>
          <Navbar signInClickHandler={this.signInClick} />
          <div
            style={{
              backgroundColor: "#313846"
            }}
          >
            <Layout.Content>
              <PaddedContentContainer>
                {this.props.children}
              </PaddedContentContainer>
            </Layout.Content>
            <Layout.Footer
              style={{
                textAlign: "center",
                borderTop: "2px solid black",
                fontSize: "18px"
              }}
            >
              Made with ❤ by Smack
            </Layout.Footer>
          </div>
        </Layout>
      </div>
    );
  }
}

export const CoverPageTemplate = withRouter(RawCoverPageTemplate);
