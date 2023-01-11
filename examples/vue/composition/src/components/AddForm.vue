<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container">
      <div id="myPaymentForm"></div>
    </div>
    <div data-test="payment-message">{{ message }}</div>
  </div>
</template>

<script>
/* import embedded-form-glue library */
import KRGlue from '@lyracom/embedded-form-glue'

export default {
  name: 'AddForm',
  props: {
    msg: String
  },
  data() {
    return {
      message: ''
    }
  },
  mounted() {
    const endpoint = '~~CHANGE_ME_ENDPOINT~~'
    const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~'
    let formToken = 'DEMO-TOKEN-TO-BE-REPLACED'

    // Generate the form token
    fetch('http://localhost:3000/createPayment', {
      method: "POST",
      body: {
        paymentConf: { amount: 10000, currency: 'USD' }
      }
    })
    .then(res => res.json())
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
    .then(({ KR }) => KR.onSubmit(this.validatePayment)) // Custom payment callback
    .then(({ KR }) =>
      KR.addForm('#myPaymentForm')
    ) /* create a payment form */
    .then(({ KR, result }) =>
      KR.showForm(result.formId)
    ) /* show the payment form */
    .catch(
      error => (this.message = error + ' (see console for more details)')
    )
  },
  methods: {
    /* Validate the payment data */
    validatePayment(paymentData) {
      fetch('http://localhost:3000/validatePayment', {
        method: "POST",
        body: paymentData
      })
      .then(res => res.json())
      .then(res => {
        if (res.status === 200) this.message = 'Payment successful!'
      })
      return false // Return false to prevent the redirection
    }
  }
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
