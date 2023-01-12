import React, { Component } from 'react'
import KRGlue from '@lyracom/embedded-form-glue'
import './App.css'

class App extends Component {
  state = { message: null }

  render() {
    return (
      <div className="form">
        <h1>Payment form</h1>
        <div className="container">
          <div id="myPaymentForm"></div>
          <div data-test="payment-message">{this.state.message}</div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const endpoint = '~~CHANGE_ME_ENDPOINT~~'
    const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~'
    let formToken = 'DEMO-TOKEN-TO-BE-REPLACED'

    fetch('http://localhost:3000/createPayment', {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        paymentConf: { amount: 10000, currency: 'USD' }
      })
    })
    .then(res => res.text())
    .then(resp => {
      formToken = resp
      return KRGlue.loadLibrary(
        endpoint,
        publicKey
      ) /* Load the remote library */
    })
    .then(({ KR }) =>
      KR.setFormConfig({
        /* set the minimal configuration */
        formToken: formToken,
        'kr-language': 'en-US' /* to update initialization parameter */
      })
    )
    .then(({ KR }) =>
      KR.onSubmit(paymentData => {
        fetch('http://localhost:3000/validatePayment', {
          method: "POST",
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(paymentData)
        })
        .then(response => {
          if (response.status === 200)
            this.setState({ message: 'Payment successful!' })
        })
        return false // Return false to prevent the redirection
      })
    ) // Custom payment callback
    .then(({ KR }) =>
      KR.addForm('#myPaymentForm')
    ) /* add a payment form  to myPaymentForm div*/
    .then(({ KR, result }) =>
      KR.showForm(result.formId)
    ) /* show the payment form */
    .catch(error =>
      this.setState({
        message: error + ' (see console for more details)'
      })
    )
  }
}

export default App
