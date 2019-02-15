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

export function init(app: any) {
  const store = createStore();

  app.use(mount('/assets', serve('./dist/assets')));

  app.use(router.routes());
}
