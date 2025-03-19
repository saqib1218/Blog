

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";

// core styles
import "./scss/volt.scss";
import { Provider } from 'react-redux';

import { store } from './app/store'
// vendor styles
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
    <ScrollToTop />
    <HomePage />
    </Provider>
  </HashRouter>,
  document.getElementById("root")
);
