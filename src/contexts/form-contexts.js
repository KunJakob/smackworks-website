import React from "react";
import {
  objectiveFormService,
  conditionFormService,
  actionFormService
} from "../services/form-selector";

export const ObjectiveFormContext = React.createContext(objectiveFormService);
export const ConditionFormContext = React.createContext(conditionFormService);
export const ActionFormContext = React.createContext(actionFormService);
