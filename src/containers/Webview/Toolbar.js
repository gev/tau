
import React, { Component } from 'react';
import { TextField } from 'rmwc/TextField';
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarIcon,
} from 'rmwc/Toolbar';
import { Elevation } from 'rmwc/Elevation';
import styles from './toolbar.css';

type Props = {
  src: ?string;
}

export default class extends Component<Props> {
  state = { focussed: false }

  focus = () => {
    this.setState({ focussed: true });
  }

  blur = () => {
    this.setState({ focussed: false });
  }

  render() {
    const { src } = this.props;
    const { focussed } = this.state;
    return (
      <div className={focussed ? styles.focussed : styles.hidden}>
        <Elevation z={6}>
          <Toolbar>
            <ToolbarRow>
              <ToolbarSection alignStart>
                <ToolbarIcon use="arrow_back" />
              </ToolbarSection>
              <ToolbarSection shrinkToFit>
                <TextField
                  theme="text-primary-on-dark"
                  value={src}
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
