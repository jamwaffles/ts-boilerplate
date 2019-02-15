import * as React from 'react';

import asset from './utils/asset';

const Container = ({ children, store, helmet }: { children: string, store: any, helmet: any }) => (
  <html>
    <head>
      <link rel="stylesheet" href={asset('main.css')} />
      <script src={asset('main.js')} defer />
    </head>

    <body>
      <main id="app" dangerouslySetInnerHTML={{ __html: children }} />

      <div id="initial_state" data-state={JSON.stringify(store.getState())} />
    </body>
  </html>
);

export default Container;
