import React from 'react';

class ShortenUrl extends React.Component {
	render(){
		if(this.props.shortCode && !this.props.error) {
			return(
				<div className="widget-short-url">
					{this.props.host}/{this.props.shortCode}
				</div>
			);
		} else if ( !this.props.shortCode && this.props.error ){
			return(
				<div className="widget-short-url bg-red">
					{this.props.error}
				</div>
			);
		}else {
			return null;
		}
	}
}

module.exports = ShortenUrl;