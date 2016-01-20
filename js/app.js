"use strict";

import React from 'react';
import { Link } from 'react-router';

import Header from './header';
import Footer from './footer';

class App extends React.Component {
  render() {
    return(
	    <div className="wrapper">
	    	<Header />
	    	<div className="container content">
		    	<h1>URL shortener!</h1>
		    	<Link to="about">About</Link>
		    	<Link to="dashboard">Dashboard</Link>
		    	{this.props.children} {/*To let this component know that which component is to be rendered here*/}
	    	</div>
	    	<Footer />
	    </div>
    ) 
  }
}
export default App;