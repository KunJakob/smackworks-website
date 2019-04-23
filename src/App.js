import React, { Component, Suspense } from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { client } from "./index";
import Loading from "./pages/loading";
import Settings from "./pages/settings";
import SignupPage from "./pages/signup";

const EmailConfirmationPage = React.lazy(() =>
  import("./pages/email-confirmation")
);

const LandingPage = React.lazy(() => import("./pages/landingpage"));
const Panel = React.lazy(() => import("./pages/panel"));

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
`;

const LazyEmailConfirmationPage = () => (
  <Suspense fallback={<Loading />}>
    <EmailConfirmationPage />
  </Suspense>
);

const LazyLandingPage = () => (
  <Suspense fallback={<Loading />}>
    <LandingPage />
  </Suspense>
);

const LazySignupPage = () => (
  <Suspense fallback={<Loading />}>
    <SignupPage />
  </Suspense>
);
const LazyPanel = () => (
  <Suspense fallback={<Loading />}>
    <Panel />
  </Suspense>
);

const LazySettings = () => (
  <Suspense fallback={<Loading />}>
    <Settings />
  </Suspense>
);

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => <Component {...props} />} />;
};

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <GlobalStyle />
          <Switch>
            <Route path="/" exact component={LazyLandingPage} />
            <Route path="/signup" component={LazySignupPage} />
            <PrivateRoute path="/panel" component={LazyPanel} />
            <Route path="/loading" component={LazySettings} />
            <Route path="/tos" component={LazyLandingPage} />
            <Route path="/confirmation" component={LazyEmailConfirmationPage} />
          </Switch>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}
