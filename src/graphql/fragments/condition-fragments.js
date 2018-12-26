import gql from "graphql-tag";

export const ConditionFragments = {
  FULL_MEMBER_CONDITION_DATA: gql`
    fragment FullMemberConditionData on Condition {
      inverted
    }
  `
};
