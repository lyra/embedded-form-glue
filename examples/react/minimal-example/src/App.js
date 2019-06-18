import React, { Component } from 'react';
import KRGlue from '@lyracom/embedded-form-glue';
import './App.css';

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

        KRGlue.loadLibrary('https://api.lyra.com', publicKey) /* Load the remote library */
              .then(({KR}) => KR.setFormConfig({              /* set the minimal configuration */
                formToken: formToken,
                'kr-language': 'en-US',                       /* to update initialization parameter */
              }))
              .then(({KR}) => KR.addForm('#myPaymentForm'))        /* add a payment form  to myPaymentForm div*/
              .then(({KR, result}) => KR.showForm(result.formId)); /* show the payment form */
    }
}

export default App;
