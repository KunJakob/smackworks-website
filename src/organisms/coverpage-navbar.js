import React, { Component } from 'react';
import { Menu } from 'antd';
import { LoginButtons } from './../molecules/navbar/login-buttons';

const bgColor = '#2f3136';

export class Navbar extends Component {
  state = {}
  render() {
    return (
      <div style={{
        position: "absolute",
        width: '100%',
        paddingTop: '5px',
        overflow: 'hidden',
        boxShadow: '0px 0px 1px 1px #000000',
        backgroundColor: bgColor,
      }}
      >

        <Menu mode='horizontal' style={{
          paddingLeft: '0.1em',
          float: 'left',
          fontSize: '20px',
          paddingBottom: '2px',
          borderBottomWidth: '0px',
          backgroundColor: bgColor,
        }}
        >
          <Menu.Item>
            <a href='/'>Home</a>
          </Menu.Item>
          <Menu.Item>Products</Menu.Item>
          <Menu.Item>Pricing</Menu.Item>
          <Menu.Item ><a href="https://discord.gg/QPW7z3j" rel="noopener noreferrer" target="_blank">Support</a></Menu.Item>
        </Menu>
        <div style={{ float: 'right', display: 'flex', marginTop: '4px' }}>
          <LoginButtons bgColor={bgColor} signInClickHandler={this.props.signInClickHandler} />
        </div>
      </div>
    );
  }
}
