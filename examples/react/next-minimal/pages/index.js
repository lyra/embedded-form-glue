import Head from 'next/head';
import React from 'react';
import dynamic from 'next/dynamic';



class IndexPage extends React.Component {

  componentDidMount() {
    import('@lyracom/embedded-form-glue').then(() => {
    const publicKey = '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5';
    const formToken = 'DEMO-TOKEN-TO-BE-REPLACED';

    KRGlue.loadLibrary('https://api.lyra.com', publicKey) /* Load the remote library */
          .then(({KR}) => KR.setFormConfig({              /* set the minimal configuration */
            formToken: formToken,
          }))
          .then(({KR}) => KR.addForm('#myPaymentForm'))        /* add a payment form  to myPaymentForm div*/
          .then(({KR, result}) => KR.showForm(result.formId)); /* show the payment form */
        });
  }

  render() {
    return (
          <div>
            <Head>
              <title>My page title</title>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <link rel="stylesheet"
                href="https://api.lyra.com/static/js/krypton-client/V4.0/ext/classic-reset.css"/>
              <script
                  src="https://api.lyra.com/static/js/krypton-client/V4.0/ext/classic.js">
              </script>  
            </Head>
            <div id="myPaymentForm"></div>
          </div>
    )
  }
}

export default IndexPage;