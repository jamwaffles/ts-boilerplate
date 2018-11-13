import * as React from 'react';
import * as Koa from 'koa';
import * as ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const app = new Koa();

app.use(async ctx => {
	ctx.body = ReactDOMServer.renderToString(<App />);
});

export default app;
