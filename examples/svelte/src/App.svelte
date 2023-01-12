<script lang="ts">
  /* import embedded-form-glue library */
  import KRGlue from '@lyracom/embedded-form-glue'
  import { onMount } from 'svelte'

  let message: string = ''

  onMount(() => {
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
    .then(({ KR }) => KR.onSubmit(validatePayment)) // Custom payment callback
    .then(({ KR }) =>
      KR.addForm('#myPaymentForm')
    ) /* create a payment form */
    .then(({ KR, result }) =>
      KR.showForm(result.formId)
    ) /* show the payment form */
    .catch(error => (message = error + ' (see console for more details)'))
  })

  /* Validate the payment data */
  const validatePayment = paymentData => {
    fetch('http://localhost:3000/validatePayment', {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(paymentData)
    })
    .then(response => {
      if (response.status === 200) message = 'Payment successful!'
    })
  }
</script>

<main>
  <div class="container">
    <h1>Svelte minimal example</h1>
    <div class="form-container" id="myPaymentForm" />
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
