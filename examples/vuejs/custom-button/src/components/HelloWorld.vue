<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
      <div class="container">
        <div id="myPaymentForm">
          <button @click="callPay()">Custom trigger button</button>
        </div>
      </div>
  </div>
</template>

<script>
/* import embedded-form-glue library */
import KRGlue from "@lyracom/embedded-form-glue";

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data: function() {
    return {
      formId: null,
    }
  },
  mounted() {
    const _this = this
    /* define the public key, you should use your personal key */
    const publicKey = '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5';

    KRGlue.loadLibrary('https://api.lyra.com', publicKey) /* Load the remote library */
      .then(({KR}) => KR.setFormConfig({                  /* set the minimal configuration */
        formToken: 'DEMO-TOKEN-TO-BE-REPLACED',
        'kr-language': 'en-US',                           /* to update initialization parameter */
      }))
      .then(({KR}) => KR.attachForm('#myPaymentForm'))             /* create a payment form */
      .then(({KR, result}) => {
        // Show the payment form
        KR.showForm(result.formId)
        _this.formId = result.formId
      });
  },
  methods: {
    callPay: function() {
      KR.submit(this.formId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.kr-payment-button {
  display: none!important;
}
</style>
