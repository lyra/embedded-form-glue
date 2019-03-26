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
import KRGlue from "@lyracom/embedded-form-glue";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    /* define the public key, you should use your personal key */
    const publicKey = '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5';

    KRGlue.loadLibrary('https://api.lyra.com', publicKey) /* Load the remote library */
      .then(({KR}) => KR.setFormConfig({                        /* set the minimal configuration */
        formToken: 'DEMO-TOKEN-TO-BE-REPLACED',
      }))
      .then(({KR}) => KR.addForm('#myPaymentForm'))             /* create a payment form */
      .then(({KR, result}) => KR.showForm(result.formId));      /* show the payment form */
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
