import React, { Component } from 'react';
import KRGlue from "@lyracom/embedded-form-glue";
import _ from "underscore";
import './App.css';

const getQuery = function() {
    let queryString = window.location.href.split("?")[1];
    let query = {};

    let segments = queryString.split("&");
    _.each(segments, segment => {
        let splittedSegment = segment.split("=");
        query[splittedSegment[0]] = splittedSegment[1];
    });


    return query;
};

let query = getQuery();
let formToken = query.formToken;
let endpoint = query.endpoint;
let publicKey = query.publicKey;
let pre;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
        };
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1>Payment form</h1>
        </header>
        <div id="myPaymentForm"></div>
        <pre>{this.state.response}</pre>
      </div>
    );
  }
    componentDidMount() {
        const _this = this;
      KRGlue.loadLibrary(endpoint, publicKey).then(KR => {
          return KR.setFormConfig({
              formToken,
          });
      }).then(KR => {
          KR.onSubmit(response => {
              _this.setState({
                  response: JSON.stringify(response),
              });
          });
          return KR.addForm("myPaymentForm");
      }).then(KR => {
          return KR.showForm(KR.result.formId);
      }).catch(err => {
          console.log({err});
      });
    }
}

export default App;
