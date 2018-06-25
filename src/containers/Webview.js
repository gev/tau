
import React, { Component } from 'react';
import styles from './webview.css';

type Props = {

  src: ?string;
}

export default class extends Component<Props> {
  init = (webview) => {
    webview.addEventListener('will-navigate', (event) => {
      console.log(event);
      // event.
    });
  }

  render() {
    const { src } = this.props;
    return (
      <webview
        className={styles.webview}
        ref={this.init}
        src={src}
      />
    );
  }
}
