import React, { Component } from 'react';
import Feature from '../../molecules/feature';
import styled from 'styled-components';

const Heading = styled.div`
display: block;
margin-left: auto;
margin-right: auto;
text-align: center;
font-size: 36px;
margin-bottom: 15px;
`
export class WhySmackWorks extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
      <Heading>Why SmackWorks?</Heading>
        <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '1000px', width: '100%', margin: '0 auto 0 auto' }}>
          <Feature
            icon={"fire"}
            header={"Straight Fire"}
            text={"SmackWorks is legit fire. It's so hot it emits radiation with a wavelength of the planck distance. How can you beat that?"}
          />
          <Feature
            icon={"fire"}
            header={"Straight Fire"}
            text={"SmackWorks is legit fire. It's so hot it emits radiation with a wavelength of the planck distance. How can you beat that?"}
          />
          <Feature
            icon={"fire"}
            header={"Straight Fire"}
            text={"SmackWorks is legit fire. It's so hot it emits radiation with a wavelength of the planck distance. How can you beat that?"}
          />
          <Feature
            icon={"fire"}
            header={"Straight Fire"}
            text={"SmackWorks is legit fire. It's so hot it emits radiation with a wavelength of the planck distance. How can you beat that?"}
          />
          <Feature
            icon={"question"}
            header={"wtf"}
            text={"In case you couldn't tell, this is all placeholder text"}
          />
          <Feature
            icon={"fire"}
            header={"Straight Fire"}
            text={"SmackWorks is legit fire. It's so hot it emits radiation with a wavelength of the planck distance. How can you beat that?"}
          />
        </div>
      </div>
    );
  }
}