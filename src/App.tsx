import * as React from 'react';
import { Store } from 'redux';
import { Switch, Route } from 'react-router';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import Home from './pages/Home';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';

export const routes: any[] = [
  { path: '/', exact: true, component: Home },
  { path: '/auth', component: Auth }
];

function Status({ code, children }: { code: number; children: any }) {
  return (
    <Route
      render={({ staticContext }: any) => {
        if (staticContext) {
          staticContext.status = code;
        }

        return children;
      }}
    />
  );
}

const App = ({ store }: { store: Store }) => (
  <Provider store={store}>
    <div>
      <Switch>
        {routes.map(
          (route: any): any => (
            <Route key={route.path} {...route} />
          )
        )}

        <Status code={404}>
          <NotFound />
        </Status>
      </Switch>
    </div>
  </Provider>
);

export default hot(module)(App);
