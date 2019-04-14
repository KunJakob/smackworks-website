import React, { Component, Suspense } from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import {
  ActionFormContext,
  ConditionFormContext,
  ObjectiveFormContext
} from "./contexts/form-contexts";
import { client } from "./index";
import Loading from "./pages/loading";
import Settings from "./pages/settings";
import SignupPage from "./pages/signup";
import {
  actionFormService,
  conditionFormService,
  objectiveFormService
} from "./state/form-selector";
import EmailConfirmationPage from "./pages/email-confirmation";
import { observer } from "mobx-react";

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

const LazyLandingPage = observer(({ authState }) =>
  authState.isAuthenticated ? (
    <Redirect
      to={{
        pathname: "/panel"
      }}
    />
  ) : (
    <Suspense fallback={<Loading />}>
      <LandingPage />
    </Suspense>
  )
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

const PrivateRoute = observer(
  ({ authState }) => ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          authState.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
);

export class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ObjectiveFormContext.Provider value={objectiveFormService}>
            <ConditionFormContext.Provider value={conditionFormService}>
              <ActionFormContext.Provider value={actionFormService}>
                <GlobalStyle />
                <Switch>
                  <Route path="/" exact component={LazyLandingPage} />
                  <Route path="/signup" component={LazySignupPage} />
                  <PrivateRoute path="/panel" exact component={LazyPanel} />
                  <PrivateRoute path="/settings" component={LazyPanel} />
                  <Route path="/loading" component={LazySettings} />
                  <Route path="/tos" component={LazyLandingPage} />
                  <Route
                    path="/confirmation"
                    component={EmailConfirmationPage}
                  />
                </Switch>
              </ActionFormContext.Provider>
            </ConditionFormContext.Provider>
          </ObjectiveFormContext.Provider>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}
