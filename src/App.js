
import fs from 'fs';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { createHashHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import { RMWCProvider } from 'rmwc/Provider';
import 'material-components-web/dist/material-components-web.min.css';
import { POOL, FILE } from './constants';
import { Main } from './containers';
import createStore from './store';
import reducer from './reducer';

const history = createHashHistory();
const pool = JSON.parse(fs.readFileSync(FILE));

const store = createStore(reducer, { [POOL]: pool }, history);

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <RMWCProvider>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/" component={Main} />
            </Switch>
          </ConnectedRouter>
        </RMWCProvider>
      </Provider>
    );
  }
}
