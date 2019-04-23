import React, { Component } from "react";
import styled from "styled-components";

const TextContainer = styled.div`
  line-height: 27.2px;
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: 16px;
  text-align: center;
  font-weight: 80;
`;

export class FeatureText extends Component {
  render() {
    return <TextContainer>{this.props.children}</TextContainer>;
  }
}
