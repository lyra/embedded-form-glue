<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container">
      <div id="myPaymentForm">
        <div class="kr-embedded">
          <div class="kr-pan"></div>
          <div class="kr-expiry"></div>
          <div class="kr-security-code"></div>
          <div class="kr-form-error"></div>
          <button class="kr-payment-button"></button>
        </div>
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
      .then(({ KR }) => KR.onSubmit(this.validatePayment)) // Custom payment callback
      .then(({ KR }) =>
        KR.attachForm('#myPaymentForm')
      ) /* create a payment form */
      .then(({ KR, result }) => {
        KR.showForm(result.formId)
        this.ready = true
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
