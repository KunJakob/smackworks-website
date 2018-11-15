import React, { Component } from 'react';
import { LandingPage } from './pages/landingpage';
import { BrowserRouter, Route } from 'react-router-dom';
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
  transition: "color 9999s ease-out, background-color 9999s ease-out";
  transition-delay: 9999s;
  -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
  -webkit-transition-delay: 9999s;
}
`

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <GlobalStyle />
          <CoverPageTemplate>

            <Route path="/" exact component={LandingPage} />
            <Route path="/signup" component={SignupPage} />

          </CoverPageTemplate>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

