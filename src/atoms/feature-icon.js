import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

const IconContainer = styled.div`
font-size: 80px;
text-align: center;
`

export class FeatureIcon extends Component {
  render() {
    console.log(this.props.children);
    return (
      <IconContainer>
        <Icon type={this.props.children}/>
      </IconContainer>
    );
  }
}
