import { ObjectiveFragments } from "../../graphql/fragments/objective-fragments";
import gql from "graphql-tag";
import React from "react";
import { QuestFormField } from "../../state/quest-form-field-container";

export const objectiveForms = [];

objectiveForms.push(
  new QuestFormField(
    "DIE",
    "Die",
    props => <div />,
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
