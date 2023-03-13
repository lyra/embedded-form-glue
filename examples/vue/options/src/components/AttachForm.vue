<template>
  <div class="hello">
    <div class="container">
      <div id="myPaymentForm">
        <div class="kr-smart-form" kr-card-form-expanded></div>
      </div>
    </div>
    <div data-test="payment-message">{{ message }}</div>
  </div>
</template>

<script>
/* import embedded-form-glue library */
import KRGlue from '@lyracom/embedded-form-glue'
import axios from 'axios'

export default {
  name: 'AttachForm',
  data() {
    return {
      message: ''
    }
  },
  mounted() {
    const endpoint = '~~CHANGE_ME_ENDPOINT~~' // format: static.my.psp.domain
    const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~' // format: 999999999:testpublickey_XXXXXXXXXX
    let formToken = null;

    // Generate the form token
    axios
      .post('http://localhost:3000/createPayment', {
        paymentConf: { amount: 10000, currency: 'EUR' }
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
      .then(({ KR }) => KR.onSubmit(this.validatePayment)) // Custom payment callback
      .then(({ KR }) =>
        KR.attachForm('#myPaymentForm')
      ) /* create a payment form */
      .then(({ KR, result }) => {
        KR.showForm(result.formId)
      }) /* show the payment form */
      .catch(
        error => (this.message = error + ' (see console for more details)')
      )
  },
  methods: {
    /* Validate the payment data */
    validatePayment(paymentData) {
      axios
        .post('http://localhost:3000/validatePayment', paymentData)
        .then(response => {
          if (response.status === 200) this.message = 'Payment successful!'
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
