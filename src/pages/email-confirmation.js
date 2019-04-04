import React, { Component } from "react";
import { confirmEmail } from "../config/common-fetches";
import { Redirect } from "react-router";
import { AuthService } from "../services/authservice";

export default class EmailConfirmationPage extends Component {
  state = {
    signedUp: false
  };
  // eslint-disable-next-line no-restricted-globals
  params = new URLSearchParams(location.search);
  id = this.params.get("id");

  render() {
    confirmEmail(this.id).then(res => {
      this.setState({
        signedUp: true
      });
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      AuthService.isAuthenticated = true;
    });
    return (
      <>
        <p>Signed up! Redirecting...</p>
        <Redirect
          to={{
            pathname: "/panel",
            state: { from: this.props.location }
          }}
        />
      </>
    );
  }
}
