<template>
  <div id="app">
      <div id="myPaymentForm"></div>
  </div>
</template>

<script>
import KRGlue from "@lyracom/embedded-form-glue";

let formToken = "01O0xI6UfrRFKb7J9_G30R_Q18AeyJhIjo5OTAsIm0iOiJFVVIiLCJvIjoiZGVtby01YmM4NjhmYzQ0MDAyIiwiYyI6eyJiIjp7InZpIjp7ImYiOnsidmFkQ2FyZFR5cGUiOnsidmFsdWUiOiJWSVNBIn19fSwibWMiOnsiZiI6eyJ2YWRDYXJkVHlwZSI6eyJ2YWx1ZSI6Ik1BU1RFUkNBUkQifX19LCJhbSI6eyJmIjp7InZhZENhcmRUeXBlIjp7InZhbHVlIjoiQU1FWCJ9fX0sImNiIjp7ImYiOnsiZGViaXRDcmVkaXQiOnsidmFsdWUiOiJjcmVkaXQifX19fX196102";

export default {
  name: 'app',
  components: {
  },
  mounted: function() {
      KRGlue.loadLibrary('http://krypton.local/', '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5').then(KR => {
          return KR.setFormConfig({
              formToken,
          });
      }).then(KR => {
          return KR.addForm("myPaymentForm");
      }).then(KR => {
          return KR.showForm(KR.result.formId);
      }).catch();
  }
}
</script>

<style>
</style>
