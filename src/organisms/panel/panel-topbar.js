import React, { Component } from "react";
import { Button } from "antd";
import styled from "styled-components";
const bgColor = "#2f3136";

const GorgeousHeader = styled.div`
  width: 100%;
  padding: 5px;
  overflow: hidden;
  height: 50px;
  box-shadow: 0px 0px 1px 1px #000000;
  background-color: ${bgColor};
  display: flex;
`;

/*const Logo = styled.div`
flex: 1;
display: flex;
justify-items: center;
align-items: center;
`*/

const Center = styled.div`
  flex: 1;
  display: flex;
  font-size: 35px;
  justify-content: center;
  align-items: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 25px;
  padding-left: 11px;
`;

const PrettyButton = styled(Button)`
  padding: 0px 8px 0px 8px !important;
  font-size: 25px;
`;

export class PanelTopBar extends Component {
  render() {
    return (
      <GorgeousHeader>
        <Left>
          <div />
        </Left>

        <Center>SmackWorks</Center>

        <Right>
          <PrettyButton
            size="large"
            icon="appstore"
            style={{
              borderWidth: "2px"
            }}
          >
            Apps
          </PrettyButton>
          <PrettyButton
            icon="setting"
            size="large"
            style={{
              marginLeft: "5px",
              borderWidth: "2px"
            }}
          >
            Settings
          </PrettyButton>
        </Right>
      </GorgeousHeader>
    );
  }
}
