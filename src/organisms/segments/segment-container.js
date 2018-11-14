import React from 'react';
import styled from 'styled-components';

const PaddedContainer = styled.div`
max-height: 600px;
min-height: 500px;
margin-top: 40px;
background-color: ${({alternate}) => {
  console.log(alternate);
  return (alternate ? "#282c34" : "#313846");
}} !important;
`

export const SegmentContainer = (props) => (
  <PaddedContainer alternate={props.alternate}>
    {props.children}
  </PaddedContainer>
);

