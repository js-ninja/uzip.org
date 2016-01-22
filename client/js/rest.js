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
	console.log("url----->",url)
	let postObjects = {
		path    : config.path,
		method  : "POST",
		entity  : {
			longUrl : url
		},
		headers : {},
		params  :{}
	}
	return client(postObjects)
}

export function getUrl(code) {
	console.log("code-------->",code)
}