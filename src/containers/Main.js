
import React, { Component } from 'react';
import { TextField } from 'rmwc/TextField';
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarIcon,
} from 'rmwc/Toolbar';
import 'material-components-web/dist/material-components-web.min.css';
import Webview from './Webview';

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
          <Toolbar>
            <ToolbarRow>
              <ToolbarSection alignStart>
                <ToolbarIcon use="arrow_back" />
              </ToolbarSection>
              <ToolbarSection shrinkToFit>
                <TextField theme="text-primary-on-dark" value={src} onChange={this.go} fullwidth />
              </ToolbarSection>
              <ToolbarSection alignEnd>
                <ToolbarIcon use="menu" />
              </ToolbarSection>
            </ToolbarRow>
          </Toolbar>
        </div>
        <Webview src={src} />
      </div>
    );
  }
}
