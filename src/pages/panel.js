import { Icon, Layout, Menu } from 'antd';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { PanelTopBar } from '../organisms/panel-topbar';

const { Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

const bgColor = '#2f3136';

const PaddedContentContainer = styled.div`
display: block;
padding-top: 60px;
padding-left: 20px;
width: 100%;
max-width: 100%;
`

const GET_ME = gql`
  {
    user {
      email
    }
  }
`;


export default class Panel extends Component {
  state = {}
  render() {
    return (

      <Layout>
        <PanelTopBar appname="reQuest"/>
        <Layout>
          <Sider width={200} >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0, backgroundColor: bgColor }}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content>
              <Query query={GET_ME}>
                {({ loading, error, data }) => {
                  if (loading) return "Loading...";
                  if (error) return `Error! ${error.message}`;

                  return (
                    <div><p>What's up my dude {data.user.email}</p></div>
                  );
                }}

              </Query>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              fontSize: '18px'
            }}
          >
            Made with ❤ by Smack
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
