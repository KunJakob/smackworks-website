export const getObjectiveForm = selectedObjective => {
  switch (selectedObjective) {
    case "GenericObjective":
      break;

    default:
      return null;
  }
};

class FormSelectorService {
  formArray = [];

  registerFormType = form => {
    if (form.key && form.displayName && form.mutation && form.jsx) {
      this.formArray.push(form);
    }
  };

  registerformTypes = forms => {
    for (let i = 0; i < forms.length; i++) {
      const form = forms[i];
      this.registerFormType(form);
    }
  };

  getForm = key => {
    for (let i = 0; i < this.formArray.length; i++) {
      const form = this.formArray[i];
      if (form.key === key) {
        return form;
      }
    }
  };
  getDisplayName = key => {
    for (let i = 0; i < this.formArray.length; i++) {
      const form = this.formArray[i];
      if (form.key === key) {
        return form.displayName;
      }
    }
  };
}

export const objectiveFormService = new FormSelectorService();
export const conditionFormService = new FormSelectorService();
export const actionFormService = new FormSelectorService();
