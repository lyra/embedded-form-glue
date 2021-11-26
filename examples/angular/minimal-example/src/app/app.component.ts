import { Component, OnInit } from "@angular/core";
import KRGlue from "@lyracom/embedded-form-glue";
import axios from 'axios'

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "minimal-example";
  message = null;

  ngOnInit() {
    const endpoint = "CHANGE_ME: JAVASCRIPT ENDPOINT";
    const publicKey = "CHANGE_ME: YOUR PUBLIC KEY";
    let formToken = "DEMO-TOKEN-TO-BE-REPLACED";

    axios
      .post('http://localhost:3000/createPayment', {
        paymentConf: { amount: 10000, currency: 'USD' }
      })
      .then(resp => {
        formToken = resp.data
        return KRGlue.loadLibrary(endpoint, publicKey) /* Load the remote library */
      })
      .then(({ KR }) =>
        KR.setFormConfig({
          /* set the minimal configuration */
          formToken: formToken,
          "kr-language": "en-US" /* to update initialization parameter */
        })
      )
      .then(({ KR }) =>
        KR.onSubmit((paymentData: KRPaymentResponse) => {
          axios
            .post('http://localhost:3000/validatePayment', paymentData)
            .then(response => {
              if (response.status === 200)
                this.message = 'Payment successful!'
            })
          return false // Return false to prevent the redirection
        })
        )
      .then(({ KR }) =>
        KR.addForm("#myPaymentForm")
      ) /* add a payment form  to myPaymentForm div*/
      .then(({ KR, result }) =>
        KR.showForm(result.formId)
      ) /* show the payment form */
      .catch(
        error => (this.message = error + " (see console for more details)")
      );
  }
}
