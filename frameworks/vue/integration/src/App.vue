<template>
  <div id="app">
      <div id="myPaymentForm"></div>
  </div>
</template>

<script>
import KRGlue from "@lyracom/embedded-form-glue";

let formToken = "01T41F_ggiSHm5Z772PiISZQ192eyJhIjoxMDAwMCwibSI6IkVVUiIsIm8iOm51bGwsImMiOnsiYiI6eyJ2aSI6eyJmIjp7InZhZENhcmRUeXBlIjp7InZhbHVlIjoiVklTQSJ9fX0sIm1jIjp7ImYiOnsidmFkQ2FyZFR5cGUiOnsidmFsdWUiOiJNQVNURVJDQVJEIn19fSwiYW0iOnsiZiI6eyJ2YWRDYXJkVHlwZSI6eyJ2YWx1ZSI6IkFNRVgifX19LCJjYiI6eyJmIjp7ImRlYml0Q3JlZGl0Ijp7InZhbHVlIjoiY3JlZGl0In19fX19LCJzaG9wTmFtZSI6IlNvIGVhc3kgdG8gdGVzdCIsImZvcm1BY3Rpb24iOiJQQVlNRU5UIn06002";

export default {
  name: 'app',
  components: {
  },
  mounted: function() {
      KRGlue.loadLibrary('http://krypton.local', '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5').then(KR => {
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
