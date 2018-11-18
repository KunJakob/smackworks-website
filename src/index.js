import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { AuthService } from './services/authservice';
import * as serviceWorker from './serviceWorker';


import ApolloClient from "apollo-boost";

/**
 * @todo readd this when backend has been updated */
//AuthService.verify();
AuthService.isAuthenticated = true;
export const client = new ApolloClient({
  uri: "http://api.smack.works:4400/",
  headers: {
    accessToken: localStorage.getItem('accessToken')
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
