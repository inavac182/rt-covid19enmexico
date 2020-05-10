import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Provider } from 'mobx-react';

import { CasesStore } from './stores';
import { HomePage } from './components';
import './less/main.less';
import { Router } from 'react-router';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const stores = {
  routing: routingStore,
  casesStore: new CasesStore(),
};

const history = syncHistoryWithStore(browserHistory, routingStore);

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Provider {...stores}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Router>
      </Provider>
    </BrowserRouter>
  );
}

ReactDOM.render(<MainRouter />, document.getElementById('main'));
