import * as React from 'react';

import asset from './utils/asset';

const Container = ({ children }: { children: any }) => (
  <html>
    <head>
      <link rel="stylesheet" href={asset('main.css')} />
      <script src={asset('main.js')} defer />
    </head>

    <body>
      <main id="app">
        {children}
      </main>
    </body>
  </html>
);

export default Container;
