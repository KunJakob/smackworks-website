import { Form, Input } from "antd";
import gql from "graphql-tag";
import React from "react";
import { ObjectiveFragments } from "../graphql/fragments/objective-fragments";

export class FormRegistrar {
  constructor() {
    this.forms = [];
    this.forms.push({
      key: "DIE",
      displayName: "Die",
      jsx: props => (
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
      mutation: gql`
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
      `
    });
  }
}
