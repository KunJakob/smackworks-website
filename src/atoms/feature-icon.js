import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

const IconContainer = styled.div`
font-size: 80px;
text-align: center;
`

export class FeatureIcon extends Component {
  render() {
    return (
      <IconContainer>
        <Icon type={this.props.children} theme="twoTone" twoToneColor="#a471ce  "/>
      </IconContainer>
    );
  }
}
