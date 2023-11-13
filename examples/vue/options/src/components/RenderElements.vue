<template>
  <div class="hello">
    <h1>Vue Options API Example</h1>
    <div class="container">
      <div id="myPaymentForm">
        <!-- if you want only cards, replace kr-smart-form by kr-embedded -->
        <div class="kr-smart-form" kr-card-form-expanded></div>
      </div>
    </div>
    <div data-test="payment-message">{{ message }}</div>
  </div>
</template>

<script>
/* import embedded-form-glue library */
import KRGlue from '@lyracom/embedded-form-glue'

export default {
  name: 'AttachForm',
  data() {
    return {
      message: ''
    }
  },
  async mounted() {
    const endpoint = '~~CHANGE_ME_ENDPOINT~~' // format: static.my.psp.domain
    const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~' // format: 999999999:testpublickey_XXXXXXXXXX

    // Generate the form token
    try {
      const res = await fetch('http://localhost:3000/createPayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentConf: { amount: 10000, currency: 'USD' }
        })
      })
      const formToken = await res.text()
      // Load the remote library
      const { KR } = await KRGlue.loadLibrary(endpoint, publicKey)
      // Set the minimal configuration
      await KR.setFormConfig({
        formToken: formToken,
        'kr-language': 'en-US'
      })

      // Custom payment callback
      await KR.onSubmit(async paymentData => {
        await this.validatePayment(paymentData)
      })

      await KR.renderElements('#myPaymentForm') // Create a payment form
    } catch (error) {
      error => (this.message = error + ' (see console for more details)')
    }
  },
  methods: {
    /* Validate the payment data */
    async validatePayment(paymentData) {
      const res = await fetch('http://localhost:3000/validatePayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      })
      if (res.status === 200) this.message = 'Payment successful!'
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
