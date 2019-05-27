import React from "react";
import { Store } from "redux";
import { Switch, Route, RouteProps } from "react-router";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader";

import { StaticContext } from "./server/types";
import asyncComponent from "./components/AsyncComponent";

// Notfound component is used inside `Status` so cannot be dynamically loaded
import NotFound from "./pages/NotFound";

// Dynamically load every page
const Home = asyncComponent(() => import("./pages/Home"));
const Auth = asyncComponent(() => import("./pages/Auth"));

export interface AppRoute {
  path: string;
  exact?: boolean;
  component: RouteProps["component"] & { fetchData?: Function };
  render?: RouteProps["render"];
}

export const appRoutes: AppRoute[] = [
  { path: "/", exact: true, component: Home },
  { path: "/auth", component: Auth },
];

function Status({ code, children }: { code: number; children: React.ReactNode }) {
  return (
    <Route
      render={({ staticContext }: { staticContext?: StaticContext }) => {
        if (staticContext) {
          staticContext.status = code;
        }

        return children;
      }}
    />
  );
}

const App = ({ store, routes = appRoutes }: { store: Store; routes?: AppRoute[] }) => (
  <Provider store={store}>
    <Switch>
      {routes.map((route: AppRoute) => (
        <Route key={route.path} {...route} />
      ))}

      <Status code={404}>
        <NotFound />
      </Status>
    </Switch>
  </Provider>
);

export default hot(module)(App);
