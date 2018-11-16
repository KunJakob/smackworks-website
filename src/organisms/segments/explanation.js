import React, { Component } from 'react';
import { SegmentContainer } from './segment-container';
import styled from 'styled-components';

const Heading = styled.div`
display: block;
margin-left: auto;
margin-right: auto;
text-align: center;
font-size: 64px;
`

export class Explanation extends Component {
  render() { 
    return ( 
      <>
        <Heading>SmackWorks</Heading>
        <p style={{
          maxWidth: '650px',
          margin: '0 auto 22.5px auto',
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: '100'
        }}>SmackWorks is a longtime passion-project by Smackzter. SmackWorks tries to solve many of the tedious tasks linked with running a Minecraft Server. Many obnoxious parts of modifying your server have been abstracted away into gorgeous web interfaces with high-performance software running on the server and the SmackWorks cloud.</p>
      </>
     );
  }
}
 