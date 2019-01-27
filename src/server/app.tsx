import * as React from 'react';
import * as Koa from 'koa';
import * as ReactDOMServer from 'react-dom/server';
import * as assets from 'koa-static-cache';
import logger from './logger';
import { StaticRouter } from 'react-router';

import App from '../App';
import Container from './Container';
import { createStore } from '../store';

export function init(app: any) {
  const store = createStore();

  app.use(
    assets('./dist', {
      prefix: '/assets'
    })
  );

  app.use(async (ctx: any) => {
    ctx.body = ReactDOMServer.renderToString(
      <StaticRouter location={ctx.request.url} context={{}}>
        <Container>
          <App store={store} />
        </Container>
      </StaticRouter>
    );
  });
}
