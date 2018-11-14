import React, { Component } from 'react';
import { Navbar } from '../organisms/coverpage-navbar';
import styled from 'styled-components';
import { Layout } from 'antd';
import { LoginModal } from '../organisms/login-modal';

const PaddedContentContainer = styled.div`
padding-top: 87px;
`

export class CoverPageTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignIn: false,
    }
  }
  showModal = () => {
    console.log('hi')
    this.setState({
      showSignIn: true,
    })
  }
  hideModal = () => {
    this.setState({
      showSignIn: false,
    })
  }

  render() {
    return (
      <div>
        <LoginModal visible={this.state.showSignIn} onOk={this.hideModal} onCancel={this.hideModal} />
        <Layout>
          <Navbar
            signInClickHandler={this.showModal}
          />
          <div style={{
            backgroundColor: '#313846'
          }}>
            <Layout.Content>
              <PaddedContentContainer>
                {this.props.children}
              </PaddedContentContainer>
            </Layout.Content>
            <Layout.Footer
              style={{
                textAlign: 'center',
                borderTop: '2px solid black',
                marginTop: '30px',
                fontSize: '18px'
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
