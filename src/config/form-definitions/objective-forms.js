import { ObjectiveFragments } from "../../graphql/fragments/objective-fragments";
import gql from "graphql-tag";
import { Input, Form } from "antd";
import React from "react";
import { QuestFormField } from "../../state/quest-form-field-container";

const objectiveForms = [];

objectiveForms.push(
  new QuestFormField(
    "DIE",
    "Die",
    props => (
      <Form.Item>
        <Input
          name="genericType"
          placeholder="TheSickestGenericType"
          autoComplete="off"
          onChange={props.handleChange}
          value={props.values.genericType}
        />
      </Form.Item>
    ),
    gql`
      mutation CreateGenericObjective(
        $questID: ID!
        $stageIndex: Int!
        $completions: Int!
        $description: String!
        $isSecret: Boolean!
      ) {
        createGenericObjective(
          params: {
            location: { questID: $questID, stageIndex: $stageIndex }
            completions: $completions
            description: $description
            isSecret: $isSecret
            type: DIE
          }
        ) {
          ...FullMemberObjectiveDataNoImplementations
          ... on GenericObjective {
            genericType: type
          }
          actions {
            delay
          }
          conditions {
            inverted
          }
        }
      }
      ${ObjectiveFragments.FULL_MEMBER_OBJECTIVE_DATA_NO_IMPLEMENTATIONS}
    `,
    gql`
      mutation updateGenericObjective(
        $questID: ID!
        $stageIndex: Int!
        $completions: Int!
        $description: String!
        $isSecret: Boolean!
      ) {
        updateGenericObjective(
          params: {
            location: { questID: $questID, stageIndex: $stageIndex }
            completions: $completions
            description: $description
            isSecret: $isSecret
            type: DIE
          }
        ) {
          ...FullMemberObjectiveDataNoImplementations
          ... on GenericObjective {
            genericType: type
          }
          actions {
            delay
          }
          conditions {
            inverted
          }
        }
      }
      ${ObjectiveFragments.FULL_MEMBER_OBJECTIVE_DATA_NO_IMPLEMENTATIONS}
    `
  )
);

export default objectiveForms;
