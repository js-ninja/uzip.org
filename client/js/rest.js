"use strict";

import Rest from 'rest'
import mime from 'rest/interceptor/mime'
import errorCode from 'rest/interceptor/errorCode'
var config = require('../config.json')

var client = Rest.wrap(mime, {
	mime: 'application/json'
})
.wrap(errorCode, {
	code: 400
});

export function addUrl(url) {
	let postObjects = {
		path    : config.path,
		method  : "POST",
		entity  : {
			longUrl : url
		},
		headers : {
			"crossDomain": true,
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "X-Requested-With"
		},
		params  :{}
	}
	return client(postObjects)
}

export function getUrl(location) {
	console.log("location-------->",location)
	let postObjects = {
		path    : config.path,
		method  : "GET",
		entity  : {
			location : location
		},
		headers : {
			"crossDomain": true,
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Origin":"http://localhost:3000",
			"Access-Control-Allow-Headers": "X-Requested-With"
		},
		params  :{
			query: location
	}
}
	return client(postObjects)
}