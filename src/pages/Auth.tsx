import * as React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { testAuthAction } from '../actions/auth';
const small = require('../../assets/small.jpg');
const large = require('../../assets/large.jpg');

// TODO: FIx <any, any>
class Auth extends React.PureComponent<any, any> {
  static fetchData() {
    console.log("Auth page fetch data");

    return Promise.resolve();
  }

  handleClick = () => {
    this.props.dispatch(testAuthAction(100))
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Auth</title>
        </Helmet>

        <div className="auth-page">Auth here</div>

        <p>Something: {this.props.auth.something}</p>

        <button onClick={this.handleClick}>Click me</button>

        <img src={small} />
        <img src={large} />
      </div>
    )
  }
}

export default connect(s => s)(Auth);
