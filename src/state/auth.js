import {
  verify,
  logout,
  login,
  requestAccessToken
} from "../config/common-fetches";
import { observable } from "mobx";

export const authState = observable({
  isAuthenticated: false
});

authState.verify = async () => {
  const accessToken = localStorage.getItem("accessToken");
  return verify(accessToken)
    .then(res => {
      console.debug("Access Token Verified");
      if (res) {
        authState.isAuthenticated = res.success;
      } else authState.wipeStorage();
    })
    .catch(rejected => {
      console.debug("Access Token Rejected");
      authState.isAuthenticated = false;
    });
};

authState.logout = async () => {
  const accessToken = localStorage.getItem("accessToken");
  return logout(accessToken).then(() => {
    localStorage.setItem("accessToken", null);
    localStorage.setItem("refreshToken", null);
  });
};

authState.requestAccessToken = async refreshToken => {
  return requestAccessToken(refreshToken).then(res => {
    if (res && res.success) {
      localStorage.setItem("accessToken", res.accessToken);
      return res.accessToken;
    }
  });
};

authState.wipeStorage = () => {
  localStorage.setItem("accessToken", null);
  localStorage.setItem("refreshToken", null);
  authState.isAuthenticated = false;
};

authState.login = async (email, password) => {
  return login(email, password).then(res => {
    if (res && res.success) {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      authState.isAuthenticated = true;
    } else {
      authState.wipeStorage();
    }
    return authState.isAuthenticated;
  });
};
