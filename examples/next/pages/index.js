import Head from 'next/head'
import KRGlue from '@lyracom/embedded-form-glue'
import { useState, useEffect } from 'react'

export default function Index() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function setupPaymentForm() {
      const endpoint = '~~CHANGE_ME_ENDPOINT~~'
      const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~'
      try {
        const res = await fetch('http://localhost:3000/createPayment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentConf: { amount: 10000, currency: 'USD' }
          })
        })
        const formToken = await res.text()

        const { KR } = await KRGlue.load({
          domain: endpoint,
          publicKey,
          formToken,
          theme: 'neon'
        }) /* Load the remote library */

        await KR.setFormConfig({
          /* set the remaining configuration */
          'kr-language': 'en-US' /* to update initialization parameter */
        })

        await KR.onSubmit(async paymentData => {
          const response = await fetch(
            'http://localhost:3000/validatePayment',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(paymentData)
            }
          )
          if (response.status === 200) setMessage('Payment successful!')
          return false // Return false to prevent the redirection
        })

        await KR.renderElements(
          '#myPaymentForm'
        ) /* Render the payment form into myPaymentForm div*/
      } catch (error) {
        setMessage(error + ' (see console for more details)')
      }
    }

    setupPaymentForm()
  }, [])

  return (
    <div>
      <Head>
        <title>NextJS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <h1>NextJS Example</h1>
        <div id="myPaymentForm">
          <div
            className="kr-smart-form"
            kr-card-form-expanded="true"
            kr-grid="true"
          />
        </div>
        <div data-test="payment-message">{message}</div>
      </div>
    </div>
  )
}
