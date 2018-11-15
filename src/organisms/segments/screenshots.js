import React, { Component } from 'react';
import { Carousel } from 'antd';
import styled from 'styled-components';

const IMG = styled.img`
max-width: auto;
margin: 0 auto 0 auto;
max-height: 350px;
`
const Heading = styled.div`
display: block;
margin-left: auto;
margin-right: auto;
text-align: center;
font-size: 36px;
margin-bottom: 16px;
`
const SlickCarousel = styled(Carousel)`
max-height: 450px;
width: auto;
margin: 0 auto 0 auto;
text-align: center;
color: black;
`


export class Screenshots extends Component {
  state = {}
  render() {
    return (
      <div style={{marginBottom: '16px'}}>
      <Heading>Screenshots</Heading>
        <SlickCarousel dots={false} autoplay={true} >
          <div><IMG alt='Screenshot' src='screenshots/1.jpg' /></div>
          <div><IMG alt='Screenshot' src='screenshots/2.jpg' /></div>
          <div><IMG alt='Screenshot' src='screenshots/3.jpg' /></div>
        </SlickCarousel>
      </div>
    );
  }
}