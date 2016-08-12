import React from 'react';

/* Component */
import ExtensionLink from './ext-link';
import Logo from './logo';
import WidgetForm from './widget-form';
import ShortenUrl from './shorten-url';

class Widget extends React.Component {
  render(){
    let count = 1000;
    return (
      <div className="widget">
        {/*
          <ExtensionLink url="http://google.com/demo"/>
        */}
        <Logo urlCount={count} />
        <WidgetForm />
        <ShortenUrl />
      </div>
    );
  }
}

module.exports = Widget;
