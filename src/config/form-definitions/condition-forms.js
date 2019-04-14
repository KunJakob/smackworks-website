import { QuestFormField } from "../../state/quest-form-field-container";
import { ConditionFragments } from "../../graphql/fragments/condition-fragments";
import gql from "graphql-tag";
import React from "react";
import { Form, Dropdown, Menu, Button, Icon } from "antd";
const conditionForms = [];

conditionForms.push(
  new QuestFormField(
    "AtTime",
    "At Time",
    props => (
      <>
        <Form.Item>
          <Dropdown
            overlay={
              <Menu
                onClick={({ key }) => {
                  props.setFieldValue("time", key);
                }}
              >
                <Menu.Item key="DAWN">DAWN</Menu.Item>
                <Menu.Item key="MORNING">MORNING</Menu.Item>
                <Menu.Item key="DAY">DAY</Menu.Item>
                <Menu.Item key="MIDDAY">MIDDAY</Menu.Item>
                <Menu.Item key="AFTERNOON">AFTERNOON</Menu.Item>
                <Menu.Item key="DUSK">DUSK</Menu.Item>
                <Menu.Item key="NIGHT">NIGHT</Menu.Item>
                <Menu.Item key="MIDNIGHT">MIDNIGHT</Menu.Item>
              </Menu>
            }
          >
            <Button style={{ minWidth: "130px" }}>
              <div style={{ float: "left" }}>
                {props.values.time || "Select a Time"}
              </div>
              <div style={{ float: "right" }}>
                <Icon type="down" />
              </div>
            </Button>
          </Dropdown>
        </Form.Item>
      </>
    ),
    gql`
      mutation createAtTimeCondition(
        $questID: ID!
        $stageIndex: Int!
        $objectiveIndex: Int!
        $inverted: Boolean!
        $time: Time!
      ) {
        createAtTimeCondition(
          params: {
            location: {
              questID: $questID
              stageIndex: $stageIndex
              objectiveIndex: $objectiveIndex
            }
            inverted: $inverted
            time: $time
          }
        ) {
          ...FullMemberConditionData
          ... on AtTime {
            time
          }
        }
      }
      ${ConditionFragments.FULL_MEMBER_CONDITION_DATA}
    `,
    gql`
      mutation updateAtTimeCondition(
        $questID: ID!
        $stageIndex: Int!
        $objectiveIndex: Int!
        $conditionIndex: Int!
        $inverted: Boolean!
        $time: Time!
      ) {
        updateAtTimeCondition(
          params: {
            location: {
              questID: $questID
              stageIndex: $stageIndex
              objectiveIndex: $objectiveIndex
              conditionIndex: $conditionIndex
            }
            inverted: $inverted
            time: $time
          }
        ) {
          ...FullMemberConditionData
          ... on AtTime {
            time
          }
        }
      }
      ${ConditionFragments.FULL_MEMBER_CONDITION_DATA}
    `
  )
);

export default conditionForms;
