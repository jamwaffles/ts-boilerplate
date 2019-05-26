import pino from "pino";
import { levels } from "pino";
import { Logger } from "pino";
import { Writable } from "stream";

const PINO_LEVELS = levels.values;

function _levelToSeverity(level: any) {
  if (level === PINO_LEVELS.trace || level === PINO_LEVELS.debug) {
    return "debug";
  }
  if (level === PINO_LEVELS.info) {
    return "info";
  }
  if (level === PINO_LEVELS.warn) {
    return "warning";
  }
  if (level === PINO_LEVELS.error) {
    return "error";
  }
  if (level >= PINO_LEVELS.fatal) {
    return "critical";
  }
  return "default";
}

class StackDriverWriter extends Writable {
  public write(chunk: Buffer) {
    const json = JSON.parse(chunk.toString());

    json.severity = _levelToSeverity(json.level);
    json.timestamp = new Date(json.time).toISOString();

    return process.stdout.write(JSON.stringify(json) + "\n");
  }
}

function getLogger(): Logger {
  let _logger: Logger;

  _logger = pino(new StackDriverWriter());

  const log_level =
    process.env.LOG_LEVEL || (process.env.NODE_ENV !== "production" ? "debug" : "info");

  _logger.level = log_level;

  _logger.trace({ log_level }, "loggerInitialised");

  return _logger;
}

const logger = getLogger();

export default logger;
