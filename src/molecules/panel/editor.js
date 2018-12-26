import React, { Component } from "react";
import PropTypes from "prop-types";
import { UpdateConditionForm } from "./forms/update-object/update-condition";

export class Editor extends Component {
  static propTypes = {
    questIndex: PropTypes.number.isRequired,
    stageIndex: PropTypes.number,
    objectiveIndex: PropTypes.number,
    actionIndex: PropTypes.number,
    conditionIndex: PropTypes.number,
    quests: PropTypes.array.isRequired
  };

  render() {
    const {
      questIndex,
      stageIndex,
      objectiveIndex,
      actionIndex,
      conditionIndex,
      quests
    } = this.props;
    if (conditionIndex && conditionIndex >= 0) {
      return <UpdateConditionForm />;
    }
    return <></>;
  }
}
