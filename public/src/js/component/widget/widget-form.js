import React from 'react';

class WidgetForm extends React.Component {

  constructor(){
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(){
    console.log('Form Submitted', this.refs.longurl.value );
  }

  render() {
    return (
      <div className="widget-form">
        <div className="input-group">
          <input ref="longurl" type="text" className="form-control" placeholder="http://some-really-long-url.com" />
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this.onSubmit}>zipp it!</button>
          </span>
        </div>
      </div>
    );
  }
}

module.exports = WidgetForm;