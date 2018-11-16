import React, { Component } from 'react';
import { LogoWithHeaders } from '../organisms/segments/banner';
import { Screenshots } from '../organisms/segments/screenshots';
import { SegmentContainer } from './../organisms/segments/segment-container';
import { WhySmackWorks } from '../organisms/segments/why-smackworks';
import { CoverPageTemplate } from '../template/coverpage-template';
import { Explanation } from './../organisms/segments/explanation';

export class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <CoverPageTemplate>
        <SegmentContainer >
          <LogoWithHeaders />
        </SegmentContainer>
        <SegmentContainer alternate>
          <Explanation />
        </SegmentContainer>
        <SegmentContainer>
          <WhySmackWorks />
        </SegmentContainer>
        <SegmentContainer alternate>
          <Screenshots />
        </SegmentContainer>
      </CoverPageTemplate>
    );
  }
}