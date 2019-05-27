import React from "react";
import Router from "koa-router";
import { Context } from "koa";
import { Helmet } from "react-helmet";
import ReactDOMServer from "react-dom/server";
import { StaticRouter, matchPath } from "react-router";

import { StaticContext } from "./types";
import Container from "./Container";
import App, { appRoutes, AppRoute } from "../App";
import { createStore } from "../store";

const basePath = process.env.BASE_PATH || "";

const router = new Router().prefix(basePath);

// Resolve dynamic imports
const routeResolvers: Promise<AppRoute>[] = appRoutes.map((route: any) =>
  typeof route.component.then === "function"
    ? route.component.then(
        (resolved: any): AppRoute => {
          return {
            ...route,
            component: resolved.default,
          };
        },
      )
    : route,
);

router.get("*", async (ctx: Context) => {
  const store = createStore();

  let dataFetches: {}[] = [];

  const resolvedRoutes: AppRoute[] = await Promise.all(routeResolvers);

  resolvedRoutes.some(
    (route: AppRoute): boolean => {
      const match = matchPath(ctx.request.path, route);

      if (match && route.component && typeof route.component.fetchData === "function") {
        dataFetches.push(
          route.component.fetchData(store.dispatch, match, {
            search: ctx.request.search,
          }),
        );
      }

      return !!match;
    },
  );

  await Promise.all(dataFetches);

  const context: StaticContext = {};

  const page = ReactDOMServer.renderToString(
    <StaticRouter basename={basePath} location={ctx.request.url} context={context}>
      <App store={store} routes={resolvedRoutes} />
    </StaticRouter>,
  );

  const metadata = Helmet.renderStatic();

  const markup = ReactDOMServer.renderToString(
    <Container store={store} metadata={metadata}>
      {page}
    </Container>,
  );

  if (context.status) {
    ctx.status = context.status;
  }

  ctx.body = markup;
});

export default router;
