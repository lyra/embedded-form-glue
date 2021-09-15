<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container">
      <div id="myPaymentForm"></div>
    </div>
    <div>{{ promiseError }}</div>
  </div>
</template>

<script>
/* import embedded-form-glue library */
import KRGlue from '@lyracom/embedded-form-glue'
/* import crypto-js library */
import hmacSHA256 from 'crypto-js/hmac-sha256'
import Hex from 'crypto-js/enc-hex'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      promiseError: ''
    }
  },
  mounted() {
    const endpoint = 'CHANGE_ME: JAVASCRIPT ENDPOINT'
    const publicKey = 'CHANGE_ME: YOUR PUBLIC KEY'
    const formToken = 'DEMO-TOKEN-TO-BE-REPLACED'

    KRGlue.loadLibrary(endpoint, publicKey) /* Load the remote library */
      .then(({ KR }) =>
        KR.setFormConfig({
          /* set the minimal configuration */
          formToken: formToken,
          'kr-language': 'en-US' /* to update initialization parameter */
        })
      )
      .then(({ KR }) =>
        KR.onSubmit(resp => {
          const answer = resp.clientAnswer
          const hash = resp.hash
          const answerHash = Hex.stringify(
            hmacSHA256(JSON.stringify(answer), 'CHANGE_ME: HMAC SHA256 KEY')
          )
          if (hash === answerHash) console.log('Payment hash is valid')
          return false
        })
      )
      .then(({ KR }) =>
        KR.addForm('#myPaymentForm')
      ) /* create a payment form */
      .then(({ KR, result }) =>
        KR.showForm(result.formId)
      ) /* show the payment form */
      .catch(
        error => (this.promiseError = error + ' (see console for more details)')
      )
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
