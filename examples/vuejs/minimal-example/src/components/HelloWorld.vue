<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container">
      <div id="myPaymentForm"></div>
    </div>
  </div>
</template>

<script>
/* import embedded-form-glue library */
import KRGlue from '@lyracom/embedded-form-glue'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
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
        KR.addForm('#myPaymentForm')
      ) /* create a payment form */
      .then(({ KR, result }) =>
        KR.showForm(result.formId)
      ) /* show the payment form */
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
