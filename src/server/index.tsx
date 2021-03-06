import Koa from "koa";

import logger from "./logger";
import { init } from "./app";

const app = new Koa();

const port = process.env.PORT || 7175;

logger.info({ port }, "serverStarted");

init(app);

app.listen(port);
