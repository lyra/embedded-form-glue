import Head from 'next/head'
import axios from 'axios'
import KRGlue from '@lyracom/embedded-form-glue'
import React from 'react'
import Script from 'next/script'

export default function Home() {
  const [message, setMessage] = React.useState('')

  const endpoint = '~~CHANGE_ME_ENDPOINT~~'
  const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~'
  let formToken = 'DEMO-TOKEN-TO-BE-REPLACED'

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
    .catch(error => {
      setMessage(error + ' (see console for more details)')
    })

  return (
    <div>
      <Head>
        <title>NextJS glue example</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="~~CHANGE_ME_ENDPOINT~~/static/js/krypton-client/V4.0/ext/classic-reset.css"
        />
      </Head>
      <Script src="~~CHANGE_ME_ENDPOINT~~/static/js/krypton-client/V4.0/ext/classic.js"></Script>
      <div id="myPaymentForm"></div>
      <div>{message}</div>
    </div>
  )
}
