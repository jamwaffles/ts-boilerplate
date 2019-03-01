import * as React from 'react';
import { Button } from 'react-bulma-components';
import { Helmet } from 'react-helmet';

export default class NotFound extends React.PureComponent<any, any> {
  render() {
    return (
      <div>
        <Helmet>
          <title>Page Not Found</title>
        </Helmet>

        <h1>Not Found</h1>
      </div>
    )
  }
}
