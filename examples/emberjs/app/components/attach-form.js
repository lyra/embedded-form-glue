import KRGlue from '@lyracom/embedded-form-glue';
import axios from 'axios';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class AttachFormComponent extends Component {
  @tracked message = '';

  constructor(...args) {
    super(...args);
    const endpoint = '~~CHANGE_ME_ENDPOINT~~';
    const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~';
    let formToken = 'DEMO-TOKEN-TO-BE-REPLACED';

    // Generate the form token
    axios
      .post('http://localhost:3000/createPayment', {
        paymentConf: { amount: 10000, currency: 'USD' },
      })
      .then((resp) => {
        formToken = resp.data;
        return KRGlue.loadLibrary(endpoint, publicKey);
      })
      .then(({ KR }) =>
        KR.setFormConfig({
          /* set the minimal configuration */
          formToken: formToken,
          'kr-language': 'en-US' /* to update initialization parameter */,
        })
      )
      .then(({ KR }) =>
        KR.onSubmit((paymentData) => {
          axios
            .post('http://localhost:3000/validatePayment', paymentData)
            .then((response) => {
              if (response.status === 200) this.message = 'Payment successful!';
            });
          return false; // Return false to prevent the redirection
        })
      ) // Custom payment callback
      .then(({ KR }) =>
        KR.attachForm('#myPaymentForm')
      ) /* create a payment form */
      .then(({ KR, result }) => {
        KR.showForm(result.formId);
        this.ready = true;
      }) /* show the payment form */
      .catch((error) => {
        console.log(this.message);
        this.message = error + ' (see console for more details)';
        console.log(this.message);
      });
  }
}
