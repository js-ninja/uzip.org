import React from 'react';
import { render } from 'react-dom';

/* Components */
import Widget from './widget/widget';
import TrendingLinks from './trending-links/trending-links';
import Footer from './footer/footer';

class App extends React.Component {
  render(){
    return (
      <div>
        <div>
          <Widget />
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
