import React from 'react';
import qwest from 'qwest';

class WidgetForm extends React.Component {

  constructor(){
    super();
    this.onSubmit   = this.onSubmit.bind(this);
    this.isUrlValid = this.isUrlValid.bind(this);
    this.onSuccess  = this.onSuccess.bind(this);
    this.onFailure  = this.onFailure.bind(this);
  }

  isUrlValid(longurl){
    if(!longurl) { return false };

    var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (!re.test(longurl)) {
      return false;
    }

    return true; // temporary ... remove later
  }

  onSubmit(e){
    e.preventDefault();
    let longurl = this.refs.longurl.value;
    let validUrl = false;

    if(!longurl){
      return this.props.setError("Url is empty.");
    }

    validUrl = this.isUrlValid(longurl);
    if(validUrl) {
      this.props.setError("Please wait...");
      qwest.post('/addUrl',{longUrl:longurl})
        .then(this.onSuccess)
        .catch(this.onFailure);
    } else {
      return this.props.setError("Url is invalid.");
    }
  }

  onSuccess(xhr, response) {
    if(response){
      return this.props.setShortCode( response.code );
    }
  }

  onFailure(e, xhr, response){
    if(response){
      console.error(response);
      return this.props.setError("Something went wrong from api server.");
    }
  }

  render() {
    return (
      <form className="widget-form" onSubmit={this.onSubmit}>
        <div className="input-group">
          <input ref="longurl" type="text"
            className="form-control"
            placeholder="http://some-really-long-url.com" />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">zipp it!</button>
          </span>
        </div>
      </form>
    );
  }
}

module.exports = WidgetForm;