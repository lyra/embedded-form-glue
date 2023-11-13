<script lang="ts">
  /* import embedded-form-glue library */
  import KRGlue from '@lyracom/embedded-form-glue'
  import { onMount } from 'svelte'

  let message: string = ''

  onMount(async () => {
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

      await KR.onSubmit(validatePayment) // Custom payment callback

      await KR.renderElements(
        '#myPaymentForm'
      ) /* create a payment form */
    } catch (error) {
      message = error + ' (see console for more details)'
    }
  })

  /* Validate the payment data */
  const validatePayment = async paymentData => {
    const response = await fetch('http://localhost:3000/validatePayment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    })
    if (response.status === 200) message = 'Payment successful!'
    return false // Return false to prevent the redirection
  }
</script>

<main>
  <div class="container">
    <h1>Svelte Example</h1>
    <div class="form-container" id="myPaymentForm">
      <div class="kr-smart-form" kr-card-form-expanded />
    </div>
    <div class="message" data-test="payment-message">{message}</div>
  </div>
</main>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
