import React from 'react';

class ExtensionLink extends React.Component {
	render(){
		return (
			<div className="widget-ext-link">
				Extension Download Links {this.props.url}
			</div>
		);
	}
}

module.exports = ExtensionLink;