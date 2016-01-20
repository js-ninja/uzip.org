"use strict"

import React from 'react'
import ReactDOM from 'react-dom'

class Dashboard extends React.Component {
	constructor(props) { //Read 
    super(props); //Doubt
    this.state = { 
    	count: 1
    };
  }
	componentDidMount() {
		console.log("in mount", this.state.count)
	}
	shortenURL() {
		/* 
		* ReactDOM.findDOMNode(this.refs.Url) - bind is used on the click event of button since es6 doesnot give autobinding as in React.createClass()
		*/
		var longUrl = ReactDOM.findDOMNode(this.refs.Url);
		var me=this;
		console.log("in functfhfhgfjgion", longUrl.value,me);
	}
	render() {
		return (
		  <div className="container">
		  	<form>
          <div className="create-board">
            <div className="board-header">
              <h3 className="board-header-h3">URL Shortener</h3>
            </div>
            <div className="control-group txt-control">
            	<div className="form-group">
	              <label className="control-label" htmlFor="inputURL">Enter your long URL here</label>
	              <input type="text" ref="Url" className="form-control" placeholder="Enter Your Long URL here"></input>
              </div>
              <div className="control-group but-control">
                <div className="controls">
                  <button className="btn  btn-info" type="button" onClick={this.shortenURL.bind(this)}>Shorten</button>
                </div>
              </div>
            </div>
          </div>
        </form>
		  </div>
		)
	}
}
export default Dashboard;