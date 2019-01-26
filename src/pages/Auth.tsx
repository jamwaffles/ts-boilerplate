import * as React from 'react';
import { connect } from 'react-redux';

import small from '@assets/small.jpg';
import large from '../../assets/large.jpg';
import { testAuthAction } from '../actions/auth';

// TODO: FIx <any, any>
class Auth extends React.PureComponent<any, any> {
  handleClick = () => {
    this.props.dispatch(testAuthAction(100))
  }

  render() {
    return (
      <div>
        <div>Auth here</div>

        <p>Something: {this.props.auth.something}</p>

        <button onClick={this.handleClick}>Click me</button>

        <img src={small} />
        <img src={large} />
      </div>
    )
  }
}

export default connect(s => s)(Auth);
