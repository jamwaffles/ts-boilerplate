import React from "react";
import { ReactNode } from "react";
import Button from "react-bulma-components/lib/components/button";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import rust from "../../assets/rust.svg";

export default class Home extends React.PureComponent<{}, {}> {
  public static fetchData(): Promise<void> {
    console.log("Homepage fetch data");

    return Promise.resolve();
  }

  public render(): ReactNode {
    return (
      <div>
        <Helmet>
          <title>Homepage</title>
        </Helmet>

        <h1>Homepage</h1>

        <Button color="primary">My Bulma button</Button>

        <img src={rust} alt="Rust logo" />

        <Link to="/auth">Go to auth page -></Link>
      </div>
    );
  }
}
