import React from 'react';

/* Component */
import ExtensionLink from './ext-link';
import Logo from './logo';
import WidgetForm from './widget-form';
import ShortenUrl from './shorten-url';

class Widget extends React.Component {
  constructor() {
    super();
    this.state = {
      shortCode:null,
      error:undefined
    }
  }

  setShortCode(code){
    this.setState({
      shortCode:code,
      error:undefined
    });
  }

  setError(error){
    this.setState({
      shortCode:null,
      error:error
    });
  }

  render(){
    return (
      <div className="widget">
        {/*
          <ExtensionLink url="http://google.com/demo"/>
        */}
        <Logo urlCount={this.props.totalCount} />

        <WidgetForm
          setShortCode={this.setShortCode.bind(this)}
          setError={this.setError.bind(this)} />

        <ShortenUrl
          host={this.props.host}
          shortCode={this.state.shortCode}
          error={this.state.error} />
      </div>
    );
  }
}

module.exports = Widget;
