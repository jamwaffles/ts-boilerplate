import mount from "koa-mount";
import serve from "koa-static";
import Koa from "koa";

import router from "./router";

import { basePathRedirect } from "./middleware";

const basePath = process.env.BASE_PATH || "";

export function init(app: Koa): void {
  app.use(basePathRedirect);

  app.use(mount(`${basePath}/assets`, serve("./dist/assets")));

  app.use(router.routes());
}
