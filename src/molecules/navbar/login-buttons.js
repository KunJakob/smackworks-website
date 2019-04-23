import React, { Component } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

export class LoginButtons extends Component {
  render() {
    return (
      <Button.Group
        size="large"
        style={{ marginRight: "0.5em", padding: "4px, 0, 0, 0" }}
      >
        <Button
          style={{ backgroundColor: this.props.bgColor }}
          onClick={() => this.props.signInClickHandler()}
        >
          Log in
        </Button>
        <Button
          style={{ backgroundColor: this.props.bgColor, marginLeft: "0.5em" }}
        >
          <Link to="/signup">Sign Up</Link>
        </Button>
      </Button.Group>
    );
  }
}
