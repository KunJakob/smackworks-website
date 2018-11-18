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
            icon={"setting"}
            header={"EZ Config"}
            text={"All offered plugins are configured in an intuitive web UI, and will never utilize text config files in production servers."}
          />
          <Feature
            icon={"lock"}
            header={"OP Security"}
            text={"SmackWorks communication is done over HTTPS and sensitive information is hashed with bcrypt with 2FA available."}
          />
          <Feature
            icon={"thunderbolt"}
            header={"Blazing Fast"}
            text={"Plugins provided by SmackWorks are guaranteed to have extensive optimization to minimize server overhead and lag."}
          />
          <Feature
            icon={"cloud"}
            header={"Auto-Updating"}
            text={"The SmackWorks cloud will automatically update your plugins to the latest version compatible with your Minecraft server (WIP)"}
          />
          <Feature
            icon={"experiment"}
            header={"Modern Tooling"}
            text={"SmackWorks is built on cutting-edge industry standards for reliable and efficient software. Rapid deployment of new features is therefore possible."}
          />
          <Feature
            icon={"heart"}
            header={"Made w/ Care"}
            text={"SmackWorks has been over a year in the making prior to release. SmackWorks is made for the community and subscription prices are to offset costs."}
          />
        </div>
      </div>
    );
  }
}