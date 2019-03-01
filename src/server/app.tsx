import * as React from 'react';
import * as Koa from 'koa';
import * as ReactDOMServer from 'react-dom/server';
import * as mount from 'koa-mount';
import * as serve from 'koa-static';
import logger from './logger';
import { StaticRouter } from 'react-router';

import App from '../App';
import Container from './Container';
import { createStore } from '../store';
import router from './router';

import { basePathRedirect } from './middleware';

const basePath = process.env.BASE_PATH || '';

export function init(app: any) {
  const store = createStore();

  app.use(basePathRedirect);

  app.use(mount(`${basePath}/assets`, serve('./dist/assets')));

  app.use(router.routes());
}
