import { useState, useEffect } from 'react'
import KRGlue from '@lyracom/embedded-form-glue'
import './App.css'

export default function MyComponent() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function setupPaymentForm() {
      const endpoint = '~~CHANGE_ME_ENDPOINT~~'
      const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~'
      let formToken = 'DEMO-TOKEN-TO-BE-REPLACED'

      try {
        const res = await fetch('http://localhost:3000/createPayment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentConf: { amount: 10000, currency: 'USD' }
          })
        })
        formToken = await res.text()

        const { KR } = await KRGlue.loadLibrary(
          endpoint,
          publicKey
        ) /* Load the remote library */

        await KR.setFormConfig({
          /* set the minimal configuration */
          formToken: formToken,
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

        const { result } = await KR.attachForm(
          '#myPaymentForm'
        ) /* Attach a payment form  to myPaymentForm div*/

        await KR.showForm(result.formId) /* show the payment form */
      } catch (error) {
        setMessage(error + ' (see console for more details)')
      }
    }

    setupPaymentForm()
  }, [])

  return (
    <div className="form">
      <h1>React + KR.attachForm</h1>
      <div className="container">
        <div id="myPaymentForm">
          <div className="kr-smart-form" kr-card-form-expanded></div>
        </div>
        <div data-test="payment-message">{message}</div>
      </div>
    </div>
  )
}
