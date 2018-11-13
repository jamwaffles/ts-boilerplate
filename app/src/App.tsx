import * as React from 'react';
import { Store } from 'redux';
import { Switch, Route } from 'react-router';
import { Provider } from 'react-redux';

import Auth from './pages/Auth';

export const routes = [
  { path: '/auth', component: Auth },
];

const App = ({ store }: { store: Store }) => (
	<Provider store={store}>
		<div>
			<Switch>
			  {routes.map(route => <Route key={route.path} {...route} />)}
			</Switch>
		</div>
	</Provider>
);

export default App;
