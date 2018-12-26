import gql from "graphql-tag";

export const QuestFragments = {
  FULL_MEMBER_QUEST_DATA: gql`
    fragment FullMemberQuestData on Quest {
      id
      ignoresQuestSlots
      name
    }
  `
};
