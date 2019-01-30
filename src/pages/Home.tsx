import * as React from 'react';
import { Button } from 'react-bulma-components';

export default class Home extends React.PureComponent<any, any> {
  render() {
    return (
      <div>
        <h1>Homepage</h1>

        <Button color="primary">My Bulma button</Button>
      </div>
    )
  }
}
