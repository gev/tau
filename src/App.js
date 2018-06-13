
import React, { Component } from 'react';

export default class extends Component {
  render() {
    return (
      <div className="container">
        <webview id="foo" src="https://www.github.com/" style={{ width: '100%', height: '100%' }} />
      </div>
    );
  }
}
