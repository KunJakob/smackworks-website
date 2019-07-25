import { Form, Input, Tooltip } from "antd";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import introspectionQueryResultData from "./config/fragments.json";
import { AuthState } from "./state/auth";
import * as serviceWorker from "./serviceWorker";
import { ActionFragments } from "./graphql/fragments/action-fragments";
import objectiveForms from "./config/form-definitions/objective-forms";
import conditionForms from "./config/form-definitions/condition-forms";
import { actionForms } from "./config/form-definitions/action-forms";
import gql from "graphql-tag";
import {
  actionFormState,
  objectiveFormState,
  conditionFormState
} from "./state/form-selector";

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

actionFormState.registerFormType({
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
    <Fragment>
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
    </Fragment>
  )
});

objectiveFormState.registerformTypes(objectiveForms);
conditionFormState.registerformTypes(conditionForms);
actionFormState.registerformTypes(actionForms);
ReactDOM.render(<App />, document.getElementById("root"));
AuthState.verify();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
