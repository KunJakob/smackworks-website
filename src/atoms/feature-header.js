import React, { Component } from "react";
import styled from "styled-components";

const FeatureHeaderContainer = styled.div`
  padding: 0px 16px 16px 16px;
  font-size: 32px;

  margin: 0px 0px 8px 0px;
  font-weight: 800px;
  border-bottom-width: 4px !important;
  border-color: #bd82ed;
  border-bottom-style: solid;
  text-align: center;
`;

export class FeatureHeader extends Component {
  render() {
    return (
      <FeatureHeaderContainer>{this.props.children}</FeatureHeaderContainer>
    );
  }
}
