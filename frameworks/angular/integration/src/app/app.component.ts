declare var window:any;
declare var JSON:any;

import { Component, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import KRGlue from "@lyracom/embedded-form-glue";
import _ from "underscore";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewChecked {
    called:boolean = false;
    response:any = null;

    constructor(private ref: ChangeDetectorRef) {}

    ngAfterViewChecked() {
        if (!this.called) {
            this.called = true;
            this.createKrypton();
        }
    }

    createKrypton() {
        const self:any = this;
        const ref:ChangeDetectorRef = this.ref;
        const getQuery:any = function() {
            let queryString:any = window.location.href.split("?")[1];
            let query:any = {};

            let segments:any = queryString.split("&");
            _.each(segments, segment => {
                let splittedSegment = segment.split("=");
                query[splittedSegment[0]] = splittedSegment[1];
            });
            return query;
        };

        let query:any = getQuery();
        let formToken:string = query.formToken;
        let endpoint:string = query.endpoint;
        let publicKey:string = query.publicKey;

        KRGlue.loadLibrary('http://krypton.local', publicKey)
            .then(KR => KR.setFormConfig({
                formToken,
            }))
            .then(KR => {
                KR.onSubmit((response:any) => {
                    self.response = JSON.stringify(response);
                    ref.detectChanges();
                });
                return KR.addForm('#myPaymentForm');
            })
            .then(KR => {
                KR.showForm(KR.result.formId);
            }).catch(err => {
                console.log(err);
            });
    }
}
