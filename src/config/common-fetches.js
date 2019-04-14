import { endpoints } from "./endpoints";

export const login = async (email, password) => {
  return fetch(endpoints.auth + "account/signin", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-cache",
    credentials: "omit",
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(res => res.json())
    .catch(error => console.error("Error:", error));
};

export const confirmEmail = async id => {
  return fetch(endpoints.auth + "account/confirmemail", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-cache",
    credentials: "omit",
    body: id
  })
    .then(async res =>
      res.json().then(value => {
        if (value.success) {
          return value;
        } else throw new Error(value.message);
      })
    )
    .catch(error => console.error(error));
};

export const signup = async (email, password) => {
  return fetch(endpoints.auth + "account/signup", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-cache",
    credentials: "omit",
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(async res =>
      res.json().then(value => {
        if (value.success) {
          return value;
        } else throw new Error(value.message);
      })
    )
    .catch(error => console.error(error));
};

export const verify = async accessToken => {
  return fetch(endpoints.auth + "account/verify", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-cache",
    credentials: "omit",
    body: JSON.stringify({
      accessToken: accessToken
    })
  })
    .then(async res =>
      res.json().then(value => {
        if (value.success) {
          return value;
        } else throw new Error(value.message);
      })
    )
    .catch(error => console.error(error));
};

export const requestAccessToken = async refreshToken => {
  return fetch(endpoints.auth + "account/requestaccesstoken", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-cache",
    credentials: "omit",
    body: JSON.stringify({
      refreshToken: refreshToken
    })
  })
    .then(res => res.json())
    .catch(error => console.error(error));
};

export const logout = async refreshToken => {
  return fetch(endpoints.auth + "account/logout", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-cache",
    credentials: "omit",
    body: JSON.stringify({
      refreshToken: refreshToken
    })
  })
    .then(async res =>
      res.json().then(value => {
        if (value.success) {
          return value;
        } else throw new Error(value.message);
      })
    )
    .catch(error => console.error(error));
};
