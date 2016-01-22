"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import * as rest from './rest'
import * as utility from './utility'

class Dashboard extends React.Component {
	constructor(props) { //Read 
    super(props); //Doubt
    this.state = { 
    	msg : '',
    	url : ''
    };
  }
	componentDidMount() {
		utility.extractCode(window.location);
		
		// console.log("loc----",str)
		// rest.getUrl('http://localhost:9001/getUrl/?code='+str)
		// .then(function(data){
		// console.log("data-----",data);
		// window.location = data.entity
		// })
	}
	setMsg(msg) {
		this.setState({
			msg : msg
		})
	}
	shortenURL() {
		var self = this;
		/* 
		* ReactDOM.findDOMNode(this.refs.Url) - bind is used on the click event of button since es6 doesnot give autobinding as in React.createClass()
		*/
		let longUrl = ReactDOM.findDOMNode(this.refs.Url).value.trim();
		if(longUrl !== ""){
			if(utility.validateUrl(longUrl)){
				this.setMsg("")
				rest.addUrl(longUrl)
				.then(function(data, error){
				 	console.log("data",data)
				 	self.setState({
				 		url: data.entity
				 	})
				});
			}
			else {
				this.setMsg("URL not valid")
			}
		} else {
				this.setMsg("Please enter a URL")
			}
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
                  <button className="btn btn-info" type="button" onClick={this.shortenURL.bind(this)}>Shorten</button>
                </div>
              </div>
              <label>{this.state.msg}</label>
              <div><a href={this.state.url} target="_blank">{this.state.url}</a></div>
            </div>
          </div>
        </form>
		  </div>
		)
	}
}
export default Dashboard;