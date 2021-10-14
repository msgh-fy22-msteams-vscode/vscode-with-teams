import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, teamsDarkV2Theme } from '@fluentui/react-northstar';

// import './index.css';
import App from './App';

ReactDOM.render(
  <Provider theme={teamsDarkV2Theme}>
    <App/>
  </Provider>,
  document.getElementById('root'),
);