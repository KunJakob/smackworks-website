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
margin-bottom: 20px;
`
const SlickCarousel = styled(Carousel)`
max-height: 450px;
width: auto;
margin: 0 auto 0 auto;
line-height: 460px;
text-align: center;
color: black;
`


export class Screenshots extends Component {
  state = {}
  render() {
    return (
      <div>
      <Heading>Screenshots</Heading>
        <SlickCarousel dots={false} autoplay={true} >
          <div><IMG alt='Screenshot' src='screenshots/1.png' /></div>
          <div><IMG alt='Screenshot' src='screenshots/2.png' /></div>
          <div><IMG alt='Screenshot' src='screenshots/3.png' /></div>
        </SlickCarousel>
      </div>
    );
  }
}