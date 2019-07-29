import React, { Component } from "react";
import {
  CREATE_STAGE_MUTATION,
  USER_QUESTS_QUERY
} from "../../graphql/queriesandmutations";
import { Mutation } from "react-apollo";
import { Menu } from "antd";
import { Icon } from "antd";
import PropTypes from "prop-types";

export class CreateStageButton extends Component {
  static propTypes = {
    questIndex: PropTypes.number.isRequired,
    questID: PropTypes.string.isRequired
  };
  render() {
    const { questIndex, questID, ...props } = this.props;
    return (
      <Mutation
        update={(cache, { data: { createStage } }) => {
          const { user } = cache.readQuery({
            query: USER_QUESTS_QUERY
          });
          user.quests[questIndex].stages.push(createStage);

          cache.writeQuery({
            query: USER_QUESTS_QUERY,
            data: {
              user: user
            }
          });
        }}
        mutation={CREATE_STAGE_MUTATION}
        refetchQueries={() => [{ query: USER_QUESTS_QUERY }]}
      >
        {(createStage, { data }) => (
          <Menu.Item
            key={questIndex + "createStage"}
            {...props}
            onClick={() => {
              createStage({
                variables: {
                  id: questID
                }
              });
            }}
          >
            <Icon type="plus" />
            Create Stage
          </Menu.Item>
        )}
      </Mutation>
    );
  }
}
