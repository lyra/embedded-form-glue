<template>
  <div id="app">
      <div id="myPaymentForm"></div>
  </div>
</template>

<script>
import KRGlue from "@lyracom/embedded-form-glue";
import _ from "underscore";

const getQuery = function() {
    let queryString = window.location.href.split("?")[1];
    let query = {};

    let segments = queryString.split("&");
    _.each(segments, segment => {
        let splittedSegment = segment.split("=");
        query[splittedSegment[0]] = splittedSegment[1];
    });


    return query;
};

let query = getQuery();
let formToken = query.formToken;
let endpoint = query.endpoint;
let publicKey = query.publicKey;

export default {
  name: 'app',
  components: {
  },
  mounted: function() {
      KRGlue.loadLibrary(endpoint, publicKey).then(KR => {
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
