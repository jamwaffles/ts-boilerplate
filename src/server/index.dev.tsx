import { addHook } from 'pirates';

// Convert image file imports into empty strings
addHook(
  (code: string, filename: string) => {
    return '';
  },
  { exts: '.jpg', matcher: () => true }
);

import * as Koa from 'koa';
import * as assets from 'koa-static-cache';
import * as webpack from 'webpack';
import * as devMiddleware from 'webpack-dev-middleware';
import * as koaWebpack from 'koa-webpack';
import logger from './logger';
import * as Webpack from 'webpack';

const webpackConfig = require('../../webpack.config.js');

import app from './app';

const compiler = Webpack(webpackConfig);

const port = parseInt(process.env.PORT || '7175', 10);

koaWebpack({
  compiler,
  devMiddleware: {
    serverSideRender: true,
    publicPath: '/',
  },
  hotClient: {
    port: port + 1
  }
}).then((middleware: any) => {
  app.use(middleware);

  logger.info('serverStarted', { port });

  app.listen(port);
});
