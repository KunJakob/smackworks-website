import gql from "graphql-tag";
import { UserFragments } from "./fragments/user-fragments";
import { ObjectiveFragments } from "./fragments/objective-fragments";
import { QuestFragments } from "./fragments/quest-fragments";

export const USER_QUESTS_QUERY = gql`
  {
    user {
      ...FullMemberUserData
      quests {
        ...FullMemberQuestData
        stages {
          objectives {
            ...FullMemberObjectiveData
            actions {
              __typename
              ... on ExecuteCommand {
                command
              }
            }
            conditions {
              __typename
              inverted
              ... on AtTime {
                time
              }
            }
          }
        }
      }
    }
  }
  ${UserFragments.FULL_MEMBER_USER_DATA}
  ${QuestFragments.FULL_MEMBER_QUEST_DATA}
  ${ObjectiveFragments.FULL_MEMBER_OBJECTIVE_DATA}
`;

export const CREATE_QUEST_MUTATION = gql`
  mutation CreateQuest($ignoresQuestSlots: Boolean!, $name: String!) {
    createQuest(
      params: { ignoresQuestSlots: $ignoresQuestSlots, name: $name }
    ) {
      ...FullMemberQuestData
      stages {
        objectives {
          ...FullMemberObjectiveData
          actions {
            __typename
          }
          conditions {
            __typename
          }
        }
      }
    }
  }
  ${QuestFragments.FULL_MEMBER_QUEST_DATA}
  ${ObjectiveFragments.FULL_MEMBER_OBJECTIVE_DATA}
`;

export const CREATE_STAGE_MUTATION = gql`
  mutation CreateStage($id: ID!) {
    createStage(id: $id) {
      objectives {
        ...FullMemberObjectiveData
      }
    }
  }
  ${ObjectiveFragments.FULL_MEMBER_OBJECTIVE_DATA}
`;
