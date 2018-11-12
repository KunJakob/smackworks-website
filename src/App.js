import React, { Component } from 'react';
import { LandingPage } from './pages/landingpage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CoverPageTemplate } from './template/coverpage-template';
import { SignupPage } from './pages/signup';
import { createGlobalStyle } from 'styled-components';
import { client } from './index';
import { ApolloProvider } from 'react-apollo';

const GlobalStyle = createGlobalStyle`
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
    -webkit-transition-delay: 9999s;
}
`

export class App extends Component {
  render() {
    return (
      <>
        <ApolloProvider client={client}>
          <GlobalStyle />
          <CoverPageTemplate>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/signup" component={SignupPage} />
              </Switch>
            </BrowserRouter>
          </CoverPageTemplate>
        </ApolloProvider>
      </>
    );
  }
}

