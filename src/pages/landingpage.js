import React, { Component } from 'react';
import { LogoWithHeaders } from '../organisms/segments/banner';
import { Screenshots } from '../organisms/segments/screenshots';
import { SegmentContainer } from './../organisms/segments/segment-container';
import { WhySmackWorks } from '../organisms/segments/why-smackworks';

export class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <SegmentContainer >
          <LogoWithHeaders />
        </SegmentContainer>
        <SegmentContainer alternate>
          <WhySmackWorks />
        </SegmentContainer>
        <SegmentContainer >
          <Screenshots />
        </SegmentContainer>


      </div>
    );
  }
}