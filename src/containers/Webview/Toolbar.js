
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField } from 'rmwc/TextField';
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarIcon
} from 'rmwc/Toolbar';
import { Elevation } from 'rmwc/Elevation';
import styles from './toolbar.css';
import { KEY_ENTER } from '../../constants';

type Props = {
  title: ?string;
  webview: () => void;
}

class Container extends Component<Props> {
  state = { focussed: false }

  focus = () => {
    const { webview } = this.props;
    this.setState({
      focussed: true,
      value: webview().getTitle()
    });
  }

  blur = () => {
    const { webview } = this.props;
    this.setState({
      focussed: false,
      value: webview().getTitle()
    });
  }

  change = ({ target: { value } }) => {
    this.setState({ value });
  }

  keyPress = ({ which, target: { value } }) => {
    const { webview } = this.props;
    if (which === KEY_ENTER) {
      try {
        webview().loadURL(new URL(value).toString());
      } catch (e) {
        webview().loadURL(`http://${value}`);
      }
    }
  }

  goBack = () => {
    const { webview } = this.props;
    webview().goBack();
  }

  goForward = () => {
    const { webview } = this.props;
    webview().goForward();
  }

  render() {
    const { title } = this.props;
    const { value = title, focussed } = this.state;
    return (
      <div className={focussed ? styles.focussed : styles.hidden}>
        <Elevation z={6}>
          <Toolbar>
            <ToolbarRow>
              <ToolbarSection shrinkToFit alignStart>
                <ToolbarIcon use="arrow_back" onClick={this.goBack} />
                <ToolbarIcon use="arrow_forward" onClick={this.goForward} />
              </ToolbarSection>
              <ToolbarSection>
                <TextField
                  theme={focussed ? 'text-primary-on-light' : 'text-primary-on-dark'}
                  className={focussed ? styles.address : styles.title}
                  value={value}
                  onChange={this.change}
                  onKeyPress={this.keyPress}
                  onFocus={this.focus}
                  onBlur={this.blur}
                  dense
                />
              </ToolbarSection>
              <ToolbarSection shrinkToFit alignEnd>
                <ToolbarIcon use="menu" />
              </ToolbarSection>
            </ToolbarRow>
          </Toolbar>
        </Elevation>
      </div>
    );
  }
}

export default connect(({ pool: { webview = {} } }) => webview)(Container);
