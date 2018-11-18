import { verify, logout, login, requestAccessToken } from './../config/common-fetches';

export const AuthService = {
  isAuthenticated: false,
  verify: async () => {
    const accessToken = localStorage.getItem('accessToken');
    return verify(accessToken).then(
      res => {
        res.success ? AuthService.isAuthenticated = true : AuthService.isAuthenticated = false;
        return AuthService.isAuthenticated;
      });
  },
  logout: async () => {
    const accessToken = localStorage.getItem('accessToken');
    return logout(accessToken).then(() => {
      localStorage.setItem('accessToken', null);
      localStorage.setItem('refreshToken', null);
    })
  },
  requestAccessToken: async (refreshToken) => {
    return requestAccessToken(refreshToken).then(res => {
      if (res.success) {
        localStorage.setItem('accessToken', res.accessToken);
        return res.accessToken;
      }
    });
  },
  wipeStorage: () => {
    localStorage.setItem('accessToken', null);
    localStorage.setItem('refreshToken', null);
    AuthService.isAuthenticated = false;
  },
  login: async (email, password) => {
    return login(email, password).then(res => {
      if (res.success) {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        AuthService.isAuthenticated = true;
      } else {
        AuthService.wipeStorage();
      }
      return (AuthService.isAuthenticated, res.message);
    })

  }
}