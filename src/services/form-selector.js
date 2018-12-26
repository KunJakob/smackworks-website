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
  /**
   *
   * @argument form.key The GraphQL typename
   * @argument form.displayName The rendered name of the form
   * @argument form.mutation The GraphQL mutation to push the object
   * @argument form.jsx Componentto render at the bottom of the form.
   */
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
