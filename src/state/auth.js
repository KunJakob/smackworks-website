import {
  verify,
  logout,
  login,
  requestAccessToken
} from "../config/common-fetches";
import { observable } from "mobx";

class Auth {
  @observable
  isAuthenticated = false;

  verify = async () => {
    const accessToken = localStorage.getItem("accessToken");
    return verify(accessToken)
      .then(res => {
        console.debug("Access Token Verified");
        if (res) {
          this.isAuthenticated = res.success;
        } else this.wipeStorage();
      })
      .catch(rejected => {
        console.debug("Access Token Rejected");
        this.isAuthenticated = false;
      });
  };

  logout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    return logout(accessToken).then(() => {
      localStorage.setItem("accessToken", null);
      localStorage.setItem("refreshToken", null);
    });
  };

  requestAccessToken = async refreshToken => {
    return requestAccessToken(refreshToken).then(res => {
      if (res && res.success) {
        localStorage.setItem("accessToken", res.accessToken);
        return res.accessToken;
      }
    });
  };

  wipeStorage = () => {
    localStorage.setItem("accessToken", null);
    localStorage.setItem("refreshToken", null);
    this.isAuthenticated = false;
  };

  login = async (email, password) => {
    return login(email, password).then(res => {
      if (res && res.success) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        this.isAuthenticated = true;
      } else {
        this.wipeStorage();
      }
      return this.isAuthenticated;
    });
  };
}

export const AuthState = new Auth();
