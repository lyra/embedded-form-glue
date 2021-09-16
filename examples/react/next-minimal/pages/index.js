import Head from 'next/head'
import React from 'react'
import axios from 'axios'

class IndexPage extends React.Component {
  state = { message: null }

  componentDidMount() {
    import('@lyracom/embedded-form-glue').then(glue => {
      const endpoint = 'CHANGE_ME: JAVASCRIPT ENDPOINT'
      const publicKey = 'CHANGE_ME: YOUR PUBLIC KEY'
      let formToken = 'DEMO-TOKEN-TO-BE-REPLACED'
      const KRGlue = glue.default

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
        )
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
    })
  }

  render() {
    return (
      <div>
        <Head>
          <title>My page title</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="stylesheet"
            href="https://[CHANGE_ME: JAVASCRIPT ENDPOINT]/static/js/krypton-client/V4.0/ext/classic-reset.css"
          />
          <script src="https://[CHANGE_ME: JAVASCRIPT ENDPOINT]/static/js/krypton-client/V4.0/ext/classic.js"></script>
        </Head>
        <div id="myPaymentForm"></div>
        <div>{this.state.message}</div>
      </div>
    )
  }
}

export default IndexPage
