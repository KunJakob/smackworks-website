import gql from "graphql-tag";

export const UserFragments = {
  FULL_MEMBER_USER_DATA: gql`
    fragment FullMemberUserData on User {
      email
      roles
      adminExpiration
      memberExpiration
      donorLockExpiration
      apiExpiration
    }
  `
};
