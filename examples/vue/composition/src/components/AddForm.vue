<template>
  <div class="hello">
    <h1>{{ props.msg }}</h1>
    <div class="container">
      <div id="myPaymentForm"></div>
    </div>
    <div data-test="payment-message">{{ message }}</div>
  </div>
</template>

<script setup>
/* import embedded-form-glue library */
import KRGlue from '@lyracom/embedded-form-glue'
import { ref, onMounted } from "vue";

const props = defineProps({ msg: String });

let message = ref("")

onMounted(()=>{
  const endpoint = '~~CHANGE_ME_ENDPOINT~~'
  const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~'
  let formToken = 'DEMO-TOKEN-TO-BE-REPLACED'

  // Generate the form token
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
  .catch(
    error => (message.value = error + ' (see console for more details)')
  )
})

/* Validate the payment data */
function validatePayment(paymentData) {
  fetch('http://localhost:3000/validatePayment', {
    method: "POST",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(paymentData)
  })
  .then(res => {
    if (res.status === 200) message.value = 'Payment successful!'
  })
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
