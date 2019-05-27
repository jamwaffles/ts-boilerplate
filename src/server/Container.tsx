import React from "react";
import { HelmetData } from "react-helmet";
import { Store } from "redux";

import asset from "./utils/asset";

const Container = ({
  children,
  store,
  metadata,
}: {
  children: string;
  store: Store;
  metadata: HelmetData;
}) => (
  <html>
    <head>
      {metadata.title.toComponent()}
      {metadata.meta.toComponent()}
      {metadata.link.toComponent()}
      <link rel="stylesheet" href={asset("main.css")} />
      <script src={asset("main.js")} defer />
    </head>

    <body>
      <main id="app" dangerouslySetInnerHTML={{ __html: children }} />

      <div id="initial_state" data-state={JSON.stringify(store.getState())} />
    </body>
  </html>
);

export default Container;
