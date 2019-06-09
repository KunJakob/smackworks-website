import React, { Component } from "react";
import { Modal } from "antd";
import { Mutation } from "react-apollo";
import { CreateQuestForm } from "./create-quest";
import { CREATE_QUEST_MUTATION } from "../../../graphql/queriesandmutations";
import { USER_QUESTS_QUERY } from "./../../../graphql/queriesandmutations";
import { client } from "../../..";

export class CreateQuestModal extends Component {
  render() {
    const { visible, onOk, onCancel } = this.props;
    return (
      <Modal
        title="Create Quest"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        footer={null}
        style={{
          paddingBottom: "0px",
          maxWidth: "300px"
        }}
      >
        <Mutation
          update={(cache, { data: { createQuest } }) => {
            const { user } = client.cache.readQuery({
              query: USER_QUESTS_QUERY
            });
            user.quests.push(createQuest);

            client.cache.writeQuery({
              query: USER_QUESTS_QUERY,
              data: {
                user: user
              }
            });
          }}
          mutation={CREATE_QUEST_MUTATION}
        >
          {(createQuest, { data }) => (
            <CreateQuestForm
              sendMutation={values => {
                console.log("we did it boys");
                createQuest({
                  variables: {
                    ignoresQuestSlots: values.ignoresQuestSlots,
                    name: values.name
                  }
                }).then(() => {
                  onOk();
                });
              }}
            />
          )}
        </Mutation>
      </Modal>
    );
  }
}
