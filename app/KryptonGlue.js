import whenDefined from './tools/whenDefined';

class Glue {
    constructor() {
        this._name = "Krypton Glue";
        this.configuration = {};
        this.loaded = false;
        this.domain = null;
        this.formToken = null;
        this.publicKey = null;
    }

    loadLibrary(domain, publicKey, formToken='01AayTWy5HTiOWMyKQFUiAfg186eyJhIjoxMDAwMCwiYyI6eyJiIjp7ImJjIjp7ImYiOnsidmFkQ2FyZFR5cGUiOnsidmFsdWUiOiJCQU5DT05UQUNUIn19fSwidmkiOnsiZiI6eyJ2YWRDYXJkVHlwZSI6eyJ2YWx1ZSI6IlZJU0EifX19LCJtYyI6eyJmIjp7InZhZENhcmRUeXBlIjp7InZhbHVlIjoiTUFTVEVSQ0FSRCJ9fX0sImFtIjp7ImYiOnsidmFkQ2FyZFR5cGUiOnsidmFsdWUiOiJBTUVYIn19fSwiY2IiOnsiZiI6eyJkZWJpdENyZWRpdCI6eyJ2YWx1ZSI6ImNyZWRpdCJ9fX19fSwibSI6IkVVUiIsIm8iOm51bGx90f02') {
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
        this.formToken = formToken;

        if (this.domain && !this.loaded && this.publicKey) {
            return this.loadKryptonClient();
        }

        return Promise.reject("The library cannot be loaded");
    }

    loadKryptonClient() {
        const _this = this;
        const publicKey = this.publicKey;
        const formToken = this.formToken;
        let domain = this.domain;

        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.type = 'text/javascript';

            // Domain must end with slash
            if (!/^.+\/$/.test(domain)) {
                domain += "/";
            }

            script.src = `${domain}static/js/krypton-client/V4.0/stable/kr-payment-form.min.js?formToken=${formToken}`;
            script.setAttribute("kr-public-key", publicKey);
            script.setAttribute("kr-spa-mode", "true");

            // Append it to body
            window.__kr__script = script;
            document.getElementsByTagName('body')[0].appendChild(script);

            whenDefined(window, 'KR', () => {
                whenDefined(window.KR, "onFormReady", () => {
                    resolve({
                        KR: window.KR,
                    });
                });
            });
        });
    }
}

export default new Glue();
