import React, { Component } from "react";
import KRGlue from "@lyracom/embedded-form-glue";
import "./App.css";

class App extends Component {
  state = { promiseError: null };

  render() {
    return (
      <div className="form">
        <h1>Payment form</h1>
        <div className="container">
          <div id="myPaymentForm"></div>
          <div>{this.state.promiseError}</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const endpoint = "CHANGE_ME: JAVASCRIPT ENDPOINT";
    const publicKey = "CHANGE_ME: YOUR PUBLIC KEY";
    const formToken = "DEMO-TOKEN-TO-BE-REPLACED";

    KRGlue.loadLibrary(endpoint, publicKey) /* Load the remote library */
      .then(({ KR }) =>
        KR.setFormConfig({
          /* set the minimal configuration */
          formToken: formToken,
          "kr-language": "en-US" /* to update initialization parameter */
        })
      )
      .then(({ KR }) =>
        KR.addForm("#myPaymentForm")
      ) /* add a payment form  to myPaymentForm div*/
      .then(({ KR, result }) =>
        KR.showForm(result.formId)
      ) /* show the payment form */
      .catch(error =>
        this.setState({
          promiseError: error + " (see console for more details)"
        })
      );
  }
}

export default App;
