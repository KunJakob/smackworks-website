import { Layout } from "antd";
import React, { Component } from "react";
import styled from "styled-components";
import { LoginModal } from "./../organisms/landingpage/login-modal";
import { Navbar } from "./../organisms/landingpage/coverpage-navbar";
import { AuthService } from "./../services/authservice";
import { withRouter } from "react-router";

const PaddedContentContainer = styled.div`
  padding-top: 87px;
`;

class RawCoverPageTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignIn: false
    };
  }
  signInClick = () => {
    if (AuthService.isAuthenticated) {
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
                fontSize: "18px",
                position: "fixed",
                bottom: "0px",
                height: "40px",
                width: "100%"
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
