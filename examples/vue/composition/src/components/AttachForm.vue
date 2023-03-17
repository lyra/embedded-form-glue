<template>
  <h1>Vue Composition API + KR.attachForm</h1>
  <div class="hello">
    <div class="container">
      <div id="myPaymentForm">
        <div class="kr-smart-form" kr-card-form-expanded></div>
      </div>
    </div>
    <div data-test="payment-message">{{ message }}</div>
  </div>
</template>

<script setup>
/* import embedded-form-glue library */
import KRGlue from '@lyracom/embedded-form-glue'
import { ref, onMounted } from 'vue'

let message = ref('')

onMounted(async () => {
  const endpoint = '~~CHANGE_ME_ENDPOINT~~'
  const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~'
  let formToken = 'DEMO-TOKEN-TO-BE-REPLACED'

  try {
    // Generate the form token
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

    const { result } = await KR.attachForm(
      '#myPaymentForm'
    ) /* create a payment form */

    await KR.showForm(result.formId) /* show the payment form */
  } catch (error) {
    message.value = error + ' (see console for more details)'
  }
})

/* Validate the payment data */
async function validatePayment(paymentData) {
  const res = await fetch('http://localhost:3000/validatePayment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData)
  })
  if (res.status === 200) message.value = 'Payment successful!'
  return false // Return false to prevent the redirection
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
