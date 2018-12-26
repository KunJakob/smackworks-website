import gql from "graphql-tag";

export const ObjectiveFragments = {
  FULL_MEMBER_OBJECTIVE_DATA: gql`
    fragment FullMemberObjectiveData on Objective {
      completions
      description
      isSecret
      ... on GenericObjective {
        genericType: type
      }
      ... on UUID {
        uuid
        uuidType: type
      }
      ... on Field {
        fieldWorld: world
        fieldUpperX: upperX
        fieldUpperY: upperY
        fieldUpperZ: upperZ
        fieldLowerX: lowerX
        fieldLowerY: lowerY
        fieldLowerZ: lowerZ
        fieldType: type
      }
      ... on Pokemon {
        pokemonName: pokemon
        pokemonType: type
      }
      ... on RightClickEntityType {
        entityTypeName: entity
      }
      ... on Location {
        locationWorld: world
        locationRange: range
        locationX: x
        locationY: y
        locationZ: z
        locationType: type
      }
    }
  `,
  FULL_MEMBER_OBJECTIVE_DATA_NO_IMPLEMENTATIONS: gql`
    fragment FullMemberObjectiveDataNoImplementations on Objective {
      completions
      description
      isSecret
    }
  `
};

/*
      
      */
