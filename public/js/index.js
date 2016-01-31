"use strict";

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

//loading jquery
//--------------------------------Isssueee------------------------------
/*import jQuery from 'jquery';
$ = jQuery
*/
//--------------------------------Isssueee------------------------------


/*Require own custom files*/
import App from './app';
import About from './about';
import Dashboard from './dashboard';
import NoMatch from './nomatch';
import '../css/style.css';

/*Require Bootstrap*/
//import '../css/libs/bootstrap.min.css';
import './libs/bootstrap.min.js'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="dashboard" component={Dashboard}/>
    </Route>
  </Router>
), document.getElementById('app'))