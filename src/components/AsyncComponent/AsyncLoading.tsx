import React from "react";

interface AsyncLoadingState {
  showLoadingSpinner: boolean;
}

export default class AsyncLoading extends React.PureComponent<{}, AsyncLoadingState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      showLoadingSpinner: false,
    };
  }

  public componentWillReceiveProps() {
    this.setState({ showLoadingSpinner: false });

    // Show loading spinner after 500ms to avoid flash of content for normal-loading pages
    setTimeout(() => {
      this.setState({ showLoadingSpinner: true });
    }, 500);
  }

  public render() {
    return <main>{this.state.showLoadingSpinner ? <p>One moment...</p> : null}</main>;
  }
}
