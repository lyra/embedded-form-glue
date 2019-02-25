import whenDefined from './tools/whenDefined';

class Glue {
    constructor() {
        this._name = "Krypton Glue";
        this.configuration = {};
        this.loaded = false;
        this.domain = null;
        this.publicKey = null;
    }

    loadLibrary(domain, publicKey) {
        if (typeof window.KR_CLIENT_LOADED != 'undefined') {
            return Promise.reject("Library KR already loaded");
        }

        if (!domain) {
            return Promise.reject("Domain not defined");
        }

        if (!publicKey) {
            return Promise.reject("Public key not defined");
        }

        this.domain = domain;
        this.publicKey = publicKey;

        if (this.domain && !this.loaded && this.publicKey) {
            return this.loadKryptonClient();
        }

        return Promise.resolve(null);
    }

    loadKryptonClient() {
        const _this = this;
        const domain = this.domain;
        const publicKey = this.publicKey;

        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `${domain}/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js`;
            script.setAttribute("kr-public-key", publicKey);

            // Append it to body
            window.__kr__script = script;
            document.getElementsByTagName('body')[0].appendChild(script);

            whenDefined(window, 'KR', () => {
                whenDefined(window.KR, "onFormReady", () => {
                    resolve(window.KR);
                });
            });
        });
    }
}

export default new Glue();
