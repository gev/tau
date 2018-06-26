
import React, { Component } from 'react';
import Toolbar from './Toolbar';
import Webview from './Webview';

type Props = {
  src: ?string
}

export default class extends Component<Props> {
  static defaultProps = {
    src: 'https://google.com'
  }
  render() {
    const { src } = this.props;
    return (
      <div className="container">
        <Toolbar src={src} />
        <Webview src={src} />
      </div>
    );
  }
}
