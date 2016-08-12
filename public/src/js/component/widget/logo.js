import React from 'react';

class Logo extends React.Component {
	render(){
		return(
			<div className="widget-logo">
				<h1>uzip</h1>
				<p className="widget-logo-caption">we have shorten {this.props.urlCount} urls.</p>
			</div>
		);
	}
}

module.exports = Logo;