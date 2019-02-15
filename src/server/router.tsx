import * as React from 'react';
import * as Router from 'koa-router';
import { Context } from 'koa';
import { Helmet } from 'react-helmet';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter, StaticRouterContext, matchPath } from 'react-router';

import Container from './Container';
import App, { routes } from '../App';
import { createStore } from '../store';

const isProduction = process.env.NODE_ENV === 'production';

const router = new Router();

router.get('*', async (ctx: Context) => {
  const store = createStore();

  // Dispatch actions here to initialise the store

  let dataFetches: {}[] = [];

  routes.some((route: any): boolean => {
    const match = matchPath(ctx.request.path, route);

    if (match && route.component && typeof route.component.fetchData === 'function') {
      dataFetches.push(route.component.fetchData(store.dispatch, match, { search: ctx.request.search }));
    }

    return !!match;
  });

  await Promise.all(dataFetches);

  const context: { status?: number } = {};

  const page = ReactDOMServer.renderToString(
    <StaticRouter location={ctx.request.url} context={context as StaticRouterContext}>
      <App store={store} />
    </StaticRouter>
  );

  const helmet = Helmet.renderStatic();

  const markup = ReactDOMServer.renderToString(
    <Container store={store} helmet={helmet}>
      {page}
    </Container>
  );

  if (context.status) {
    ctx.status = context.status;
  }

  ctx.body = markup;
});

export default router;
