import { Component, OnInit } from "@angular/core";
import KRGlue from "@lyracom/embedded-form-glue";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "minimal-example";
  promiseError = null;

  ngOnInit() {
    const endpoint = "CHANGE_ME: JAVASCRIPT ENDPOINT";
    const publicKey = "CHANGE_ME: YOUR PUBLIC KEY";
    const formToken = "DEMO-TOKEN-TO-BE-REPLACED";

    KRGlue.loadLibrary(endpoint, publicKey) /* Load the remote library */
      .then(({ KR }) =>
        KR.setFormConfig({
          /* set the minimal configuration */
          formToken: formToken,
          "kr-language": "en-US" /* to update initialization parameter */
        })
      )
      .then(({ KR }) =>
        KR.addForm("#myPaymentForm")
      ) /* add a payment form  to myPaymentForm div*/
      .then(({ KR, result }) =>
        KR.showForm(result.formId)
      ) /* show the payment form */
      .catch(
        error => (this.promiseError = error + " (see console for more details)")
      );
  }
}
