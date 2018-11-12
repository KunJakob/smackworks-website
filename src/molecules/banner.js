import React, { Component } from 'react';
import styled from 'styled-components';

const IMGWithMargins = styled.img`
margin-top: 20px;
margin-bottom: 40px;
display: block;
margin-left: auto;
margin-right: auto;
`
const TopHeading = styled.div`
display: block;
margin-left: auto;
margin-right: auto;
text-align: center;
font-size: 64px;
`

const BottomHeading = styled.div`
display: block;
margin-left: auto;
margin-right: auto;
text-align: center;
font-size: 36px;
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
        <IMGWithMargins alt='Picture of a Charizard from Pokémon' src='charizard.png' height='280x' width='280px'></IMGWithMargins>
        <BottomHeading>Minecraft Plugins Done Right</BottomHeading>
      </div>
    );
  }
}
