import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import gql from "graphql-tag";
import React, { Fragment } from "react";
import { Form, Dropdown, Menu, Button, Icon, Input, Tooltip } from "antd";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import ReactDOM from "react-dom";
import { App } from "./App";
import introspectionQueryResultData from "./config/fragments.json";
import { AuthState } from "./state/auth";
import * as serviceWorker from "./serviceWorker";
import { ActionFragments } from "./graphql/fragments/action-fragments";
import { objectiveForms } from "./config/form-definitions/objective-forms";
//import conditionForms from "./config/form-definitions/condition-forms";
//import { actionForms } from "./config/form-definitions/action-forms";
import {
  actionFormState,
  objectiveFormState,
  conditionFormState
} from "./state/form-selector";
import { ConditionFragments } from "./graphql/fragments/condition-fragments";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

if (process.env.NODE_ENV === "development") {
  window._env_ = {
    API_URL: "https://api.smack.works/graphql",
    AUTH_URL: "https://api.smack.works/"
  };
}

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
      uri: window._env_.API_URL,
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    })
  ]),
  cache: cache
});

conditionFormState.registerFormType({
  key: "AtTime",
  displayName: "At Time",
  jsx: props => (
    <Fragment>
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
    </Fragment>
  ),
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
        __typename
        ...FullMemberConditionData
        ... on AtTime {
          time
        }
      }
    }
    ${ConditionFragments.FULL_MEMBER_CONDITION_DATA}
  `,
  update: gql`
    mutation updateAtTimeCondition(
      $questID: ID!
      $stageIndex: Int!
      $objectiveIndex: Int!
      $conditionIndex: Int!
      $inverted: Boolean!
      $time: Time!
    ) {
      updateAtTimeCondition(
        params: {
          location: {
            questID: $questID
            stageIndex: $stageIndex
            objectiveIndex: $objectiveIndex
            conditionIndex: $conditionIndex
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
  `
});

objectiveFormState.registerformTypes(objectiveForms);
//conditionFormState.registerformTypes(conditionForms);
//actionFormState.registerformTypes(actionForms);
ReactDOM.render(<App />, document.getElementById("root"));
AuthState.verify();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
