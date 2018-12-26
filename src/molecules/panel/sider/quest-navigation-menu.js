import { Menu } from "antd";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { CreateActionButton } from "../../../atoms/quest-sidenav/create-action-button";
import { CreateConditionButton } from "../../../atoms/quest-sidenav/create-condition-button";
import { CreateObjectiveButton } from "../../../atoms/quest-sidenav/create-objective-button";
import { CreateStageButton } from "../../../atoms/quest-sidenav/create-stage-button";
import {
  actionFormService,
  conditionFormService,
  objectiveFormService
} from "../../../services/form-selector";

const bgColor = "#2f3136";
const SubMenu = Menu.SubMenu;

export class QuestNavigationMenu extends Component {
  static propTypes = {
    quest: PropTypes.object.isRequired,
    questIndex: PropTypes.number.isRequired,
    createObjectiveClick: PropTypes.func.isRequired,
    createConditionClick: PropTypes.func.isRequired,
    createActionClick: PropTypes.func.isRequired
  };

  render() {
    const {
      quest,
      questIndex,
      createObjectiveClick,
      createConditionClick,
      createActionClick
    } = this.props;
    return (
      <>
        <Scrollbars
          style={{
            height: "80vh",
            width: "auto"
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            inlineIndent={6}
            style={{
              height: "100%",
              backgroundColor: bgColor
            }}
          >
            {quest.stages.map((stage, stageIndex) => {
              return (
                <SubMenu
                  style={{
                    paddingLeft: "6px",
                    textAlign: "left"
                  }}
                  key={stageIndex}
                  title={
                    stageIndex === 0 ? "Begin Quest" : "Stage " + stageIndex
                  }
                >
                  {stage.objectives.map((objective, index) => {
                    const objectiveIndex = stageIndex + index;
                    return (
                      <SubMenu
                        key={
                          objectiveIndex +
                          (objective.genericType ||
                            objective.uuidType ||
                            objective.fieldType ||
                            objective.pokemonType ||
                            objective.locationType ||
                            objective.__typename)
                        }
                        title={objectiveFormService.getDisplayName(
                          objective.genericType ||
                            objective.uuidType ||
                            objective.fieldType ||
                            objective.pokemonType ||
                            objective.locationType ||
                            objective.__typename
                        )}
                      >
                        <SubMenu
                          key={objectiveIndex + "conditions"}
                          title={"Conditions"}
                        >
                          {objective.conditions.map((condition, index) => {
                            const conditionIndex =
                              objectiveIndex + "conditions" + index;
                            return (
                              <Menu.Item key={conditionIndex}>
                                {conditionFormService.getDisplayName(
                                  condition.__typename
                                )}
                              </Menu.Item>
                            );
                          })}
                          <CreateConditionButton
                            questID={quest.id}
                            stageIndex={stageIndex}
                            objectiveIndex={objectiveIndex}
                            createConditionClick={createConditionClick}
                          />
                        </SubMenu>
                        <SubMenu
                          key={objectiveIndex + "actions"}
                          title="Actions"
                        >
                          {objective.actions.map((action, index) => {
                            const actionIndex =
                              objectiveIndex + "actions" + index;
                            return (
                              <Menu.Item key={actionIndex}>
                                {actionFormService.getDisplayName(
                                  action.__typename
                                )}
                              </Menu.Item>
                            );
                          })}
                          <CreateActionButton
                            questID={quest.id}
                            stageIndex={stageIndex}
                            objectiveIndex={objectiveIndex}
                            createActionClick={createActionClick}
                          />
                        </SubMenu>
                      </SubMenu>
                    );
                  })}
                  <CreateObjectiveButton
                    questID={quest.id}
                    stageIndex={stageIndex}
                    createObjectiveClick={createObjectiveClick}
                  />
                </SubMenu>
              );
            })}
            <Menu.Divider />
            <CreateStageButton questID={quest.id} questIndex={questIndex} />
          </Menu>
        </Scrollbars>
      </>
    );
  }
}
