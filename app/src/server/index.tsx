import * as React from 'react';
import * as Koa from 'koa';
import * as ReactDOMServer from 'react-dom/server';
import * as assets from 'koa-static-cache';
import * as webpack from 'webpack';
import * as devMiddleware from 'webpack-dev-middleware';
import * as koaWebpack from 'koa-webpack';
import * as Webpack from 'webpack';

const webpackConfig = require('../../webpack.config.js');

import App from '../App';
import Container from './Container';

const app = new Koa();
const compiler = Webpack(webpackConfig);

koaWebpack({ compiler })
	.then((middleware: any) => {
		app.use(middleware);

		app.use(assets('./dist', {
			prefix: '/assets'
		}));

		app.use(async ctx => {
			ctx.body = ReactDOMServer.renderToString(
				<Container>
					<App />
				</Container>
			);
		});

		const port = process.env.PORT || 7175;

		app.listen(port);

});
