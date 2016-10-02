import React from 'react';
import qwest from 'qwest';

class TrendingLinks extends React.Component{

	constructor() {
		super();
		this.state = {
			metas:undefined
		}
		this.getMetaURL = 'http://getmeta.micro-service.xyz/v1';
		this.links = undefined;
		this.getMeta = this.getMeta.bind(this);
	}

	componentWillMount() {
		var _this = this;
		qwest.get('/api/trending/today')
			.then((data)=>{
				let _data = JSON.parse(data.response);
				let keys 	= Object.keys(_data);
				let temp 	= [];

				for(let i=0; i < keys.length; i++){
					temp.push(_data[keys[i]].url);
				}

				//Limit only 5 links
				if(temp.length > 5){
					temp.length = 5;
				}

				return temp;
			})
			.then(_this.getMeta)
	}

	getMeta(links){
		let _this = this;
		let _metas = [];
		let _setMeta = function(){
			if(_metas.length === links.length){
				_this.setState({
					metas:_metas
				})
			}
		}

		// Set
		qwest.setDefaultOptions({
		    headers: {
		        'Content-Type': 'application/json',
		        'Cache-Control' : false
		    }
		});

		for(let i=0; i < links.length; i++){
			console.log('Start', links[i])
			qwest.post(_this.getMetaURL,{'url':links[i]})
				.then((meta)=>{
					let _res = JSON.parse(meta.response);
					_metas.push(JSON.parse(meta.response));
					_setMeta();
				}, (err)=>{
					console.log('Error : ', err)
				})
		}


	}

  render() {
    return (
      <div className="trending-url">
        <h2>Trending Links.</h2>
        {this.state.metas && this.state.metas.map((meta, index)=>{
        	return (
        	  <div className="meta" key={index}>
        	  	<div className="meta-title">
        	  		<a href={meta.url} target="_blank">{meta.title || meta.url}</a>
        	  	</div>
        	  	<div className="meta-url">
        	  		<a href={meta.url} target="_blank"> {meta.url} </a>
        	  	</div>
        	  	<div className="meta-image-container">
        	  		<a href={meta.url} target="_blank">
        	  			<img className="meta-image" src={meta.image} />
        	  		</a>
        	  	</div>
        	  	<div className="meta-description">
        	  		{meta.description}
        	  	</div>
        	  </div>
        	);
        })}
      </div>
    );
  }
}

module.exports = TrendingLinks;