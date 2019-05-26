import { addHook } from "pirates";
import { Configuration } from "webpack";

// Convert image file imports into empty strings
addHook(() => "", {
  exts: [".jpg", ".jpeg", ".png", ".gif", ".png", ".svg", ".ico"],
  matcher: () => true,
});

import Koa from "koa";
import koaWebpack from "koa-webpack";
import Webpack from "webpack";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpackConfig: Configuration[] = require("../../webpack.config.js");
import logger from "./logger";
import { init } from "./app";

const app = new Koa();

const compiler = Webpack(webpackConfig.find((c) => c.name === "browser"));

const port = parseInt(process.env.PORT || "7175", 10);

koaWebpack({
  compiler,
  devMiddleware: {
    serverSideRender: true,
    publicPath: "/assets/",
  },
  hotClient: {
    port: port + 1,
  },
}).then((middleware) => {
  app.use(middleware);

  init(app);

  logger.info({ port }, "serverStarted");

  app.listen(port);
});
