<template>
  <div class="hello">
    <h1>embedded card form</h1>
    <div class="container">
      <div id="myPaymentForm">
        <div class="kr-smart-form">
        </div>
      </div>
    </div>
    <div data-test="payment-message">{{ message }}</div>
  </div>
</template>

<script setup>
/* import embedded-form-glue library */
import KRGlue from '@lyracom/embedded-form-glue'
import { ref, onMounted } from 'vue'

let request = { amount: 10100, currency: 'EUR' }

let message = ref('')

onMounted(async () => {
  const endpoint = 'https://kjs-release.lyra-labs.fr'
  const publicKey = '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5'
  let formToken = ''

  try {
    /* Load the remote library */
    const { KR } = await KRGlue.loadLibrary(
      endpoint,
      publicKey
    )

    /* cleanUp previous loadings and reset config */
    await KR.removeForms()
    await KR.setFormConfig({
      formToken: '',
      'kr-language': 'fr-FR'
    })

     /* show the payment form */
    const { result } = await KR.addForm('#myPaymentForm')
    await KR.showForm(result.formId)

    /* callback where to send the newly created transaction */
    await KR.onTransactionCreated(newCreatedTransaction)

    /* Generate the form token */
    const res = await fetch('http://localhost:3000/createPayment/fr-demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentConf: request
      })
    })
    formToken = await res.text()

    /* set the formToken and formConfig */
    await KR.setFormConfig({
      formToken: formToken
    })

  } catch (error) {
    message.value = error + ' (see console for more details)'
  }
})

/* Validate the payment data */
async function newCreatedTransaction(paymentData) {

  console.log(paymentData.clientAnswer)
  if (paymentData.clientAnswer.orderStatus === 'PAID') message.value = 'Payment successful!'
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
