import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import { createContext } from 'react';
import Router from './router'

import './i18n'
import './style.css'

const Context = (createContext(null)).Provider;
const ContextDefaultValue = null;

const App = () => {
  return (
    <Context value={ContextDefaultValue}>
      <Router/>
    </Context>
  )
};

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
