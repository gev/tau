

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { go, push } from '../../actions';
import styles from './webview.css';

type Props = {
  url: ?string;
  go: (url: string) => void;
  push: (url: string) => void;
}

class Container extends Component<Props> {
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.url !== this.props.url;
  // }

  init = (webview) => {
    webview.addEventListener('did-navigate', (event) => {
      console.log(event);
      this.props.push(event.url);
    });
    webview.addEventListener('new-window', (event) => {
      console.log(event);
      this.props.go(event.url);
    });
  }

  render() {
    const { url } = this.props;
    return (
      <webview
        className={styles.webview}
        ref={this.init}
        src={url}
      />
    );
  }
}

export default connect(
  ({ pool: { history = {} } }) => history,
  (dispatch) => bindActionCreators({ go, push }, dispatch)
)(Container);
