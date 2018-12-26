import gql from "graphql-tag";

export const ActionFragments = {
  FULL_MEMBER_ACTION_DATA: gql`
    fragment FullMemberActionData on Action {
      delay
    }
  `
};
