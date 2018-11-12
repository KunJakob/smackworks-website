import React, { Component } from 'react';
import { LogoWithHeaders } from '../molecules/banner';

export class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <LogoWithHeaders />
      </div>
    );
  }
}