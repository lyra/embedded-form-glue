declare var window:any;
declare var JSON:any;

import { Component, AfterViewChecked } from '@angular/core';
import KRGlue from "@lyracom/embedded-form-glue";
import _ from "underscore";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

interface Response {
    KR: any
    result: any
}

export class AppComponent implements AfterViewChecked {
    called:boolean = false;
    response:any = null;

    ngAfterViewChecked() {
        const publicKey = '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5';
        const formToken = 'DEMO-TOKEN-TO-BE-REPLACED';

        KRGlue.loadLibrary("https://api.lyra.com", publicKey).then((response):Response => {
            return response.KR.setFormConfig({formToken});
        }).then((response):Response => {
            return response.KR.onSubmit((response:any) => {
                // The payment response is here
                let paymentResponse = response;
            });
        }).then((response):Response => {
            return response.KR.addForm("#myPaymentForm");
        }).then((response):Response => {
            return response.KR.showForm(response.result.formId);
        }).catch((err):any => {
            // Any error will be thrown here
        });
    }
}
