import logger from './logger';
import app from './app';

const port = process.env.PORT || 7175;

logger.info('serverStarted', { port });

app.listen(port);
