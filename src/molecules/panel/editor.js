import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { UpdateConditionForm } from "./forms/update-forms/update-condition";
import { USER_QUESTS_QUERY } from "../../graphql/queriesandmutations";
import { Mutation, withApollo } from "react-apollo";
import { merge } from "lodash";
import { conditionFormState } from "../../state/form-selector";
import { observer } from "mobx-react";
import { client } from "../..";

@observer
class RawEditor extends Component {
  static propTypes = {
    questIndex: PropTypes.number.isRequired,
    stageIndex: PropTypes.number,
    objectiveIndex: PropTypes.number,
    actionIndex: PropTypes.number,
    conditionIndex: PropTypes.number,
    quests: PropTypes.array.isRequired
  };

  render() {
    console.log(this.props);
    const {
      questIndex,
      stageIndex,
      objectiveIndex,
      actionIndex,
      conditionIndex
      //quests
    } = this.props;
    const hasStage = stageIndex >= 0;
    const hasObjective = objectiveIndex >= 0;
    const hasCondition = conditionIndex >= 0;
    const hasAction = actionIndex >= 0;
    if (!hasStage && !hasObjective && !hasCondition && !hasAction) {
      return <Fragment>Select a quest to begin</Fragment>;
    } else {
      if (hasCondition) {
        const data = this.props.client.cache.readQuery({
          query: USER_QUESTS_QUERY
        });
        const cachedCondition =
          data.user.quests[questIndex].stages[stageIndex].objectives[
            objectiveIndex
          ].conditions[conditionIndex];
        const form = conditionFormState.getForm(cachedCondition.__typename);
        return (
          <Mutation
            update={(cache, { data }) => {
              const { user } = cache.readQuery({ query: USER_QUESTS_QUERY });
              console.log("USER:", user);
              const updateCondition = data[Object.keys(data)[0]];
              updateCondition.conditionIndex = undefined;
              const condition =
                user.quests[questIndex].stages[stageIndex].objectives[
                  objectiveIndex
                ].conditions[conditionIndex];
              console.log(condition);
              const newCon = merge(condition, updateCondition);
              user.quests[questIndex].stages[stageIndex].objectives[
                objectiveIndex
              ].conditions[conditionIndex] = newCon;
              console.log("DATA:", data);
              console.log("MERGED:", user);
              cache.writeQuery({
                query: USER_QUESTS_QUERY,
                data: {
                  user: user
                }
              });
              client.reFetchObservableQueries();
            }}
            mutation={form.update}
          >
            {updateCondition => (
              <UpdateConditionForm
                questFormFieldContainer={form}
                currentValues={cachedCondition}
                conditionIndex={conditionIndex}
                successCallback={values => {
                  const variables = {};
                  for (let key in values) {
                    variables[key] = values[key];
                  }

                  variables.questID = data.user.quests[questIndex].id;
                  variables.stageIndex = stageIndex;
                  variables.objectiveIndex = objectiveIndex;
                  variables.conditionIndex = conditionIndex;
                  console.log("vars", variables);
                  return updateCondition({
                    variables
                  });
                }}
              />
            )}
          </Mutation>
        );
      }
      return <Fragment />;
    }
  }
}

export const Editor = withApollo(RawEditor);
