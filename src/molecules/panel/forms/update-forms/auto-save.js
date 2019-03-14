import React from "react";
import PropTypes from "prop-types";
import debounce from "lodash"; // or whatevs
import isEqual from "lodash";

export class AutoSave extends React.Component {
  static contextTypes = {
    formik: PropTypes.object
  };

  state = {
    isSaving: false
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (!isEqual(nextProps.values, this.props.values)) {
      this.save();
    }
  }

  save = debounce(() => {
    this.setState({ isSaving: true, saveError: undefined });
    this.props
      .onSave(this.props.values)
      .then(
        () => this.setState({ isSaving: false, lastSaved: new Date() }),
        () => this.setState({ isSaving: false, undefined })
      );
  }, 300);

  render() {
    return this.props.render(this.state);
  }
}
