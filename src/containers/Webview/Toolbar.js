
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField } from 'rmwc/TextField';
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarIcon,
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
      value: webview().getURL()
    });
  }

  blur = () => {
    this.setState({
      focussed: false,
      value: null
    });
  }

  change = ({ target: { value } }) => {
    this.setState({ value });
  }

  keyPress = (event) => {
    const { webview } = this.props;
    if (event.which === KEY_ENTER) {
      webview().loadURL(event.target.value);
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
    const { value = '' } = this.state;
    const { focussed } = this.state;
    return (
      <div className={focussed ? styles.focussed : styles.hidden}>
        <Elevation z={6}>
          <Toolbar>
            <ToolbarRow>
              <ToolbarSection alignStart>
                <ToolbarIcon use="arrow_back" onClick={this.goBack} />
                <ToolbarIcon use="arrow_forward" onClick={this.goForward} />
              </ToolbarSection>
              <ToolbarSection shrinkToFit>
                <TextField
                  theme="text-primary-on-dark"
                  value={value}
                  placeholder={title}
                  onChange={this.change}
                  onKeyPress={this.keyPress}
                  onFocus={this.focus}
                  onBlur={this.blur}
                  fullwidth
                />
              </ToolbarSection>
              <ToolbarSection alignEnd>
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