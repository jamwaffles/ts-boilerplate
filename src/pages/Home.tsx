import * as React from 'react';
import { Button } from 'react-bulma-components';
import { Helmet } from 'react-helmet';

export default class Home extends React.PureComponent<any, any> {
  static fetchData() {
    console.log("Homepage fetch data");

    return Promise.resolve();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Homepage</title>
        </Helmet>

        <h1>Homepage</h1>

        <Button color="primary">My Bulma button</Button>
      </div>
    )
  }
}
