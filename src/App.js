
import React, { Component } from 'react';
import { TextField } from 'rmwc/TextField';
import 'material-components-web/dist/material-components-web.min.css';

export default class extends Component {
  state = {};

  go = (event) => {
    this.setState({ src: event.target.value });
  }

  render() {
    const { src } = this.state;
    return (
      <div className="container">
        <div className="toolbar">
          <TextField value={src} onChange={this.go} fullwidth />
        </div>
        <webview src={src} style={{ width: '100%', height: '100%' }} plugins />
      </div>
    );
  }
}
