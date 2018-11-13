import * as React from 'react';
import * as Koa from 'koa';
import * as ReactDOMServer from 'react-dom/server';
import * as assets from 'koa-static-cache';

import App from '../App';
import Container from './Container';

const app = new Koa();

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

