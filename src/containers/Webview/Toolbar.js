
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, TextFieldIcon } from 'rmwc/TextField';
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
  history: ?[];
  currentIndex: ?null;
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
    const { title, history = [], currentIndex = 0 } = this.props;
    const { value = title, focussed } = this.state;
    const url = history[currentIndex];
    const isSecure = url.indexOf('https://') === 0;
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
                  theme="text-primary-on-dark"
                  className={focussed ? styles.address : styles.title}
                  value={value}
                  onChange={this.change}
                  onKeyPress={this.keyPress}
                  onFocus={this.focus}
                  onBlur={this.blur}
                  dense
                  withLeadingIcon={isSecure && (
                    <TextFieldIcon
                      theme="text-primary-on-dark"
                      use="security"
                    />
                  )}
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
