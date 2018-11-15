import React, { Component } from 'react';
import { LogoWithHeaders } from '../organisms/segments/banner';
import { Screenshots } from '../organisms/segments/screenshots';
import { SegmentContainer } from './../organisms/segments/segment-container';

export class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <SegmentContainer alternate={false}>
          <LogoWithHeaders />
        </SegmentContainer>
        <SegmentContainer alternate={true}>
          <Screenshots />
        </SegmentContainer>


      </div>
    );
  }
}