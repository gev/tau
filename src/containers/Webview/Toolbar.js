
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField } from 'rmwc/TextField';
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarIcon,
} from 'rmwc/Toolbar';
import { Elevation } from 'rmwc/Elevation';
import { go, goBack, goForward } from '../../actions';
import styles from './toolbar.css';
import { KEY_ENTER } from '../../constants';

type Props = {
  url: ?string;
  go: (url: string) => void;
  goBack: () => void;
  goForward: () => void;
}

class Container extends Component<Props> {
  state = { focussed: false }

  focus = () => {
    const { url } = this.props;
    this.setState({ focussed: true, value: url });
  }

  blur = () => {
    this.setState({ focussed: false, value: null });
  }

  change = ({ target: { value } }) => {
    this.setState({ value });
  }

  keyPress = (event) => {
    if (event.which === KEY_ENTER) {
      this.props.go(event.target.value);
    }
  }

  render() {
    const { url } = this.props;
    const { value = '' } = this.state;
    const { focussed } = this.state;
    return (
      <div className={focussed ? styles.focussed : styles.hidden}>
        <Elevation z={6}>
          <Toolbar>
            <ToolbarRow>
              <ToolbarSection alignStart>
                <ToolbarIcon use="arrow_back" onClick={this.props.goBack} />
                <ToolbarIcon use="arrow_forward" onClick={this.props.goForward} />
              </ToolbarSection>
              <ToolbarSection shrinkToFit>
                <TextField
                  theme="text-primary-on-dark"
                  value={value}
                  placeholder={url}
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

export default connect(
  ({ pool: { history = {} } }) => history,
  (dispatch) => bindActionCreators({ go, goBack, goForward }, dispatch)
)(Container);
