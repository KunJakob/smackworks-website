import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeinkeyframe = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`

const IMGWithMargins = styled.img`
margin-top: 20px;
margin-bottom: 40px;
display: block;
margin-left: auto;
margin-right: auto;
opacity: 1;
animation-name: ${fadeinkeyframe};
animation-iteration-count: 1;
animation-timing-function: ease-in;
animation-duration: 0.5s;
`
const TopHeading = styled.div`
display: block;
margin-left: auto;
margin-right: auto;
text-align: center;
font-size: 64px;
animation-name: ${fadeinkeyframe};
animation-iteration-count: 1;
animation-timing-function: ease-in;
animation-duration: 0.5s;
`

const BottomHeading = styled.div`
display: block;
margin-left: auto;
margin-right: auto;
text-align: center;
font-size: 36px;
animation-name: ${fadeinkeyframe};
animation-iteration-count: 1;
animation-timing-function: ease-in;
animation-duration: 0.5s;
`

export const HorizontalCenterColumnFlexbox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width: auto;
`

export class LogoWithHeaders extends Component {
  state = {}
  render() {
    return (
      <div>
        <TopHeading>SmackWorks</TopHeading>
        <IMGWithMargins alt='Charizard from Pokémon' src='charizard.png' height='280x' width='280px'></IMGWithMargins>
        <BottomHeading>Minecraft Plugins Done Right</BottomHeading>
      </div>
    );
  }
}
