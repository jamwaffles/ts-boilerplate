import fs from "fs";
import { Option, None, Some } from "funfix";

import logger from "../logger";

interface Manifest {
  [key: string]: string;
}

let manifest: Option<Manifest> = None;

function readManifest(): Manifest {
  return manifest.getOrElseL(() => {
    try {
      // Path is relative to start command directory, not source file
      const file = fs.readFileSync("./dist/asset-manifest.json", {
        encoding: "utf-8",
      });
      const parsed = JSON.parse(file);

      manifest = Some(parsed);

      return parsed;
    } catch (e) {
      logger.error({ e }, "assetManifestReadFailed");

      return {};
    }
  });
}

export default function asset(filename: string): string {
  const mapped = readManifest()[filename];

  const found = mapped || `/assets/${filename}`;

  logger.debug({ filename, found, fromMapping: mapped }, "mapAsset");

  return found;
}
