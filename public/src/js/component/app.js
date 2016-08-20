import React from 'react';
import { render } from 'react-dom';

/* Components */
import Widget from './widget/widget';
import TrendingLinks from './trending-links/trending-links';
import Footer from './footer/footer';

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
