import { observable, action } from "mobx";

class FormSelectorService {
  @observable
  formArray = [];

  @action
  registerFormType = form => {
    if (form.key && form.displayName && form.mutation && form.jsx) {
      this.formArray.push(form);
    }
  };

  @action
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

export const objectiveFormState = new FormSelectorService();
export const conditionFormState = new FormSelectorService();
export const actionFormState = new FormSelectorService();
