
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'rmwc/Icon';
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
  state = { isFocussed: false }

  focus = (event) => {
    const { webview } = this.props;
    this.setState({
      isFocussed: true,
      value: webview().getURL()
    });
    event.target.select();
  }

  blur = () => {
    const { webview } = this.props;
    setTimeout(() => {
      this.setState({
        isFocussed: false,
        value: webview().getTitle()
      });
    }, 100);
  }

  change = ({ target: { value } }) => {
    this.setState({ value });
  }

  loadURL = (url) => {
    const { webview } = this.props;
    try {
      webview().loadURL(new URL(url).toString());
    } catch (e) {
      webview().loadURL(`http://${url}`);
    }
  }

  go = () => {
    this.loadURL(this.state.value);
  }

  keyPress = ({ which, target: { value } }) => {
    if (which === KEY_ENTER) {
      this.loadURL(value);
    }
  }

  reload = () => {
    const { webview } = this.props;
    webview().reload();
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
    const { value = title, isFocussed } = this.state;
    const url = history[currentIndex];
    const isSecure = url.indexOf('https://') === 0;
    return (
      <div className={isFocussed ? styles.focussed : styles.hidden}>
        <Elevation z={6}>
          <Toolbar>
            <ToolbarRow>
              <ToolbarSection shrinkToFit alignStart>
                <ToolbarIcon use="arrow_back" onClick={this.goBack} />
                <ToolbarIcon use="arrow_forward" onClick={this.goForward} />
              </ToolbarSection>
              <ToolbarSection>
                <div className={styles.bar}>
                  <Icon
                    className={styles.leadingIcon}
                    theme="text-primary-on-dark"
                    use={isSecure ? 'lock' : 'lock_open'}
                  />
                  <input
                    className={styles.address}
                    value={value}
                    onChange={this.change}
                    onKeyPress={this.keyPress}
                    onFocus={this.focus}
                    onBlur={this.blur}
                  />
                  <Icon
                    className={styles.trailingIcon}
                    theme="text-primary-on-dark"
                    use={isFocussed ? 'search' : 'refresh'}
                    onClick={isFocussed ? this.go : this.reload}
                  />
                </div>
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
