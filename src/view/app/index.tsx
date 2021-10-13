import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, teamsTheme } from '@fluentui/react-northstar';

// import './index.css';
import App from './App';

ReactDOM.render(
  <Provider theme={teamsTheme}>
    <App/>
  </Provider>,
  document.getElementById('root'),
);