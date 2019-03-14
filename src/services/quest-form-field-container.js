export class QuestFormField {
  /**
   *
   * @argument key The GraphQL typename
   * @argument displayName The rendered name of the form
   * @argument create The GraphQL mutation to create the object
   * @argument update The GraphQL mutation to update the object
   * @argument jsx Component to render at the bottom of the form. This is for additional fields beyond what is standard in an objective/condition/action
   */
  constructor(key, displayName, jsx, mutation, update) {
    this.key = key;
    this.displayName = displayName;
    this.mutation = mutation;
    this.update = update;
    this.jsx = jsx;
  }
}
