import React from 'react';
import { render } from 'react-dom';

/* Components */
import Widget from './widget/widget';
import TrendingLinks from './trending-links/trending-links';
import Footer from './footer/footer';

// var WebSocket = require('ws');
var host = window.document.location.host.replace(/:.*/, '');
window.ws = new WebSocket('ws://' + host + ':3003');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      totalCount : null
    }
  }

  componentWillMount() {
    let _this = this;
    ws.onmessage = function (event) {
      let _data = null;


      // Parse JSON Response
      try {
        _data = JSON.parse(event.data);
      } catch(e) {
        console.log(e);
      }

      // Update count for new url
      if(_data.broadcast && _data.broadcast.updateTotalCount){
        _this.setState({
          totalCount: _this.state.totalCount + 1
        })
      }

      // Get Initial Total Count
      if(_data.totalCount) {
        _this.setState({
          totalCount : _data.totalCount
        });
      }

    }
  }

  render(){
    let host = window.location.origin;

    return (
      <div>
        <div>
          <Widget host={host} totalCount={this.state.totalCount}/>
        </div>
          {
            <div>
              <TrendingLinks />
            </div>
          }
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
