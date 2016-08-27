import React from 'react';
import { render } from 'react-dom';

/* Components */
import Widget from './widget/widget';
import TrendingLinks from './trending-links/trending-links';
import Footer from './footer/footer';

// var WebSocket = require('ws');
var host = window.document.location.host.replace(/:.*/, '');
window.ws = new WebSocket('ws://' + host + ':3003');

ws.onmessage = function (event) {
  console.log('a', JSON.parse(event.data));
};




class App extends React.Component {
  render(){
    let host = window.location.origin;

    return (
      <div>
        <div>
          <Widget host={host}/>
        </div>
          {/*
            <div>
              <TrendingLinks />
            </div>
          */}
          {/*
            <div>
              <Footer />
            </div>
          */}
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
