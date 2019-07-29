import { actionFormState } from "../../../state/form-selector";
import gql from "graphql-tag";
import { ActionFragments } from "../../../graphql/fragments/action-fragments";
import { Fragment } from "react";
import { Form, Tooltip, Input } from "antd";
import React from "react";
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
        __typename
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
