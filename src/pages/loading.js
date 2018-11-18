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

display: flex;
margin: auto;
opacity: 1;
animation-name: ${fadeinkeyframe};
animation-iteration-count: 1;
animation-timing-function: ease-in;
animation-duration: 0.5s;
`
export default class Loading extends Component {
  state = {}
  render() {
    return (
      <div>
        <IMGWithMargins alt='Charizard from Pokémon' src='charizard.png' height='280x' width='280px'></IMGWithMargins>
      </div>
    );
  }
}