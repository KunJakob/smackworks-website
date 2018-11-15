import React from 'react';
import styled from 'styled-components';

const PaddedContainer = styled.div`
padding-top: 20px;
padding-bottom: 20px;
-webkit-box-shadow: 0px 4px 6px 0px rgba(0,0,0,1);
-moz-box-shadow: 0px 4px 6px 0px rgba(0,0,0,1);
box-shadow: 0px 4px 6px 0px rgba(0,0,0,1);
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

