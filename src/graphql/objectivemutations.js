import gql from "graphql-tag";
import { ObjectiveFragments } from "./fragments/objective-fragments";

export const ObjectiveMutations = {
  /*   GenericObjective: gql`
    mutation CreateGenericObjective(
      $questID: ID!
      $stageIndex: Int!
      $completions: Int!
      $description: String!
      $isSecret: Boolean!
      $type: GenericType
    ) {
      createGenericObjective(
        params: {
          location: { questID: $questID, stageIndex: $stageIndex }
          completions: $completions
          description: $description
          isSecret: $isSecret
          type: $type
        }
      ) {
        ...FullMemberObjectiveData
        actions {
          __typename
        }
        conditions {
          __typename
        }
      }
    }
    ${ObjectiveFragments.FULL_MEMBER_OBJECTIVE_DATA}
  ` */
};
