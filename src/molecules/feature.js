import React, { Component } from "react";
import { FeatureIcon } from "./../atoms/feature-icon";
import { FeatureText } from "./../atoms/feature-text";
import { FeatureHeader } from "./../atoms/feature-header";
import styled from "styled-components";

const FeatureStyling = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 277.328px;
`;

export class Feature extends Component {
  render() {
    return (
      <FeatureStyling>
        <FeatureIcon>{this.props.icon}</FeatureIcon>
        <FeatureHeader>{this.props.header}</FeatureHeader>
        <FeatureText>{this.props.text}</FeatureText>
      </FeatureStyling>
    );
  }
}
