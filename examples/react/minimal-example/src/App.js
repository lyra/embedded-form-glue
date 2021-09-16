import React, { Component } from 'react'
import KRGlue from '@lyracom/embedded-form-glue'
import axios from 'axios'
import './App.css'

class App extends Component {
  state = { message: null }

  render() {
    return (
      <div className="form">
        <h1>Payment form</h1>
        <div className="container">
          <div id="myPaymentForm"></div>
          <div>{this.state.message}</div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const endpoint = 'CHANGE_ME: JAVASCRIPT ENDPOINT'
    const publicKey = 'CHANGE_ME: YOUR PUBLIC KEY'
    let formToken = 'DEMO-TOKEN-TO-BE-REPLACED'

    // Generate the form token
    axios
      .post('http://localhost:3000/createPayment', {
        paymentConf: { amount: 10000, currency: 'USD' }
      })
      .then(resp => {
        formToken = resp.data
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
          axios
            .post('http://localhost:3000/validatePayment', paymentData)
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
