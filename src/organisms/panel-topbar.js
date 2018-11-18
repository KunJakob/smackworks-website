import React, { Component } from 'react';
import {Icon, Button } from 'antd';
import styled from 'styled-components';
const bgColor = '#2f3136';

const GorgeousHeader = styled.div`
width: 100%;
padding: 5px;
overflow: hidden;
height: 50px;
box-shadow: 0px 0px 1px 1px #000000;
background-color: ${bgColor};
display: flex;
`

const Left = styled.div`
flex: 1;          
display: flex;
justify-content: flex-start;
align-items: center;
font-size: 35px;
max-width: 200px;
width: 200px;
`

const Logo = styled.div`
flex: 1;
display: flex;
justify-items: center;
align-items: center;
`

const Center = styled.div`
flex: 1;
display: flex;
justify-content: center;
align-items: center;
`

const Right = styled.div`
flex: 1;
display: flex;
justify-content: flex-end;
align-items: center;
`

export class PanelTopBar extends Component {
  render() {
    return (
      <GorgeousHeader>
        
        <Left><Logo>{this.props.appname}</Logo></Left>

        <Center>SmackWorks</Center>

        <Right><Button icon='appstore'>Apps</Button></Right>


      </GorgeousHeader>
    );
  }
}