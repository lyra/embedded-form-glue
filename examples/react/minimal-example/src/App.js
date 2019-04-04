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
    render() {
        return (
          <div className="form">
            <h1>Payment form</h1>
              <div className="container">
                <div id="myPaymentForm"></div>
              </div>
          </div>
        )
    }

    componentDidMount() {
        const publicKey = '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5';
        const formToken = 'DEMO-TOKEN-TO-BE-REPLACED';

        KRGlue.loadLibrary("https://api.lyra.com", publicKey).then(({KR, result}) => {
            return KR.setFormConfig({formToken});
        }).then(({KR, result}) => {
            return KR.onSubmit((response:any) => {
                // The payment response is here
            });
        }).then(({KR, result}) => {
            return KR.addForm("#myPaymentForm");
        }).then(({KR, result}) => {
            return KR.showForm(result.formId);
        }).catch(err => {
            // Any error will be thrown here
        });
    }
}

export default App;
