import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'

/*Require own custom files*/
import HelloWorld from './home';
import About from './about';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={HelloWorld}>
      <Route path="about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))