import React from "react";
import {
  objectiveFormService,
  conditionFormService,
  actionFormService
} from "../state/form-selector";

export const ObjectiveFormContext = React.createContext(objectiveFormService);
export const ConditionFormContext = React.createContext(conditionFormService);
export const ActionFormContext = React.createContext(actionFormService);
