
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { WEBVIEW } from '../../constants';
import { set } from '../../actions';
import Toolbar from './Toolbar';
import styles from './webview.css';

type Props = {
  history: ?[];
  currentIndex: ?number;
  setTitle: ({ title: string }) => void;
  sync: ({ history: [], currentIndex: number }) => void;
}

class Container extends Component<Props> {
  shouldComponentUpdate() {
    return false;
  }

  sync = () => {
    const { sync } = this.props;
    sync(this.webview.getWebContents());
  }

  init = (webview) => {
    this.webview = webview;
    this.webview.addEventListener('dom-ready', () => {
      const { history = [], currentIndex = 0 } = this.props;
      const webContents = this.webview.getWebContents();
      webContents.history = history;
      webContents.goToIndex(currentIndex);
      this.webview.addEventListener('did-navigate', this.sync);
      this.webview.addEventListener('did-navigate-in-page', this.sync);
      this.webview.addEventListener('page-title-updated', this.props.setTitle);
      this.webview.addEventListener('new-window', ({ url }) => {
        webContents.loadURL(url);
      });
    }, { once: true });
  }

  getWebview = () => this.webview

  render() {
    return (
      <div className="container">
        <webview
          className={styles.webview}
          src="./assets/blank.html"
          ref={this.init}
        />
        <Toolbar webview={this.getWebview} />
      </div>
    );
  }
}

export default connect(
  ({ pool: { webview = {} } }) => webview,
  (dispatch) => bindActionCreators({
    setTitle: ({ title }) => set(WEBVIEW, { title }),
    sync: ({ history, currentIndex }) => set(WEBVIEW, { history, currentIndex })
  }, dispatch)
)(Container);
