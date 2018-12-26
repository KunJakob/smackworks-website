import { Button, Dropdown, Form, Menu, Icon, Input, Tooltip } from "antd";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { endpoints } from "./config/endpoints";
import introspectionQueryResultData from "./config/fragments.json";
import { ConditionFragments } from "./graphql/fragments/condition-fragments";
import { AuthService } from "./services/authservice";
import {
  conditionFormService,
  objectiveFormService,
  actionFormService
} from "./services/form-selector";
import { FormRegistrar } from "./services/quest-form-service";
import * as serviceWorker from "./serviceWorker";
import { ActionFragments } from "./graphql/fragments/action-fragments";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });
export const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: endpoints.api,
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    })
  ]),
  cache: cache
});

const objectiveFormRegistrar = new FormRegistrar();
conditionFormService.registerFormType({
  key: "AtTime",
  displayName: "At Time",
  mutation: gql`
    mutation createAtTimeCondition(
      $questID: ID!
      $stageIndex: Int!
      $objectiveIndex: Int!
      $inverted: Boolean!
      $time: Time!
    ) {
      createAtTimeCondition(
        params: {
          location: {
            questID: $questID
            stageIndex: $stageIndex
            objectiveIndex: $objectiveIndex
          }
          inverted: $inverted
          time: $time
        }
      ) {
        ...FullMemberConditionData
        ... on AtTime {
          time
        }
      }
    }
    ${ConditionFragments.FULL_MEMBER_CONDITION_DATA}
  `,
  jsx: props => (
    <>
      <Form.Item>
        <Dropdown
          overlay={
            <Menu
              onClick={({ key }) => {
                props.setFieldValue("time", key);
              }}
            >
              <Menu.Item key="DAWN">DAWN</Menu.Item>
              <Menu.Item key="MORNING">MORNING</Menu.Item>
              <Menu.Item key="DAY">DAY</Menu.Item>
              <Menu.Item key="MIDDAY">MIDDAY</Menu.Item>
              <Menu.Item key="AFTERNOON">AFTERNOON</Menu.Item>
              <Menu.Item key="DUSK">DUSK</Menu.Item>
              <Menu.Item key="NIGHT">NIGHT</Menu.Item>
              <Menu.Item key="MIDNIGHT">MIDNIGHT</Menu.Item>
            </Menu>
          }
        >
          <Button style={{ minWidth: "130px" }}>
            <div style={{ float: "left" }}>
              {props.values.time || "Select a Time"}
            </div>
            <div style={{ float: "right" }}>
              <Icon type="down" />
            </div>
          </Button>
        </Dropdown>
      </Form.Item>
    </>
  )
});

actionFormService.registerFormType({
  key: "ExecuteCommand",
  displayName: "Execute Command",
  mutation: gql`
    mutation CreateExecuteCommandAction(
      $questID: ID!
      $stageIndex: Int!
      $objectiveIndex: Int!
      $delay: Float!
      $command: String!
    ) {
      createExecuteCommandAction(
        params: {
          location: {
            questID: $questID
            stageIndex: $stageIndex
            objectiveIndex: $objectiveIndex
          }
          delay: $delay
          command: $command
        }
      ) {
        ...FullMemberActionData
        ... on ExecuteCommand {
          command
        }
      }
    }
    ${ActionFragments.FULL_MEMBER_ACTION_DATA}
  `,
  jsx: props => (
    <>
      <Form.Item>
        <div>
          <Tooltip title="%p is the placeholder for playername">
            <span>Execute Command</span>
          </Tooltip>
        </div>

        <Input
          name="command"
          onChange={props.handleChange}
          autoComplete="off"
          placeholder="pokegive %p Charmander"
          value={props.values.command}
        />
      </Form.Item>
    </>
  )
});

objectiveFormService.registerformTypes(objectiveFormRegistrar.forms);

AuthService.verify().then(() =>
  ReactDOM.render(<App />, document.getElementById("root"))
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
