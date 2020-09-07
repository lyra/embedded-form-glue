import 'es6-promise/auto'
import whenDefined from './tools/whenDefined'

class Glue {
  constructor() {
    // Singleton
    if (!!Glue.instance) return Glue.instance

    Glue.instance = this

    this._name = 'Krypton Glue'
    this.configuration = {}
    this.domain = null
    this.formToken = null
    this.publicKey = null
    this.loaded = null

    return this
  }

  loadLibrary(domain, publicKey, formToken = null) {
    let hasErrors = false
    if (this.loaded) {
      return Promise.resolve({ KR: window.KR })
    }

    if (!domain) {
      return Promise.reject('Domain not defined')
    }

    if (!publicKey) {
      return Promise.reject('Public key not defined')
    }

    if (
      !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g.test(
        domain
      )
    ) {
      hasErrors = true
      console.error(`[${domain}] is not a valid endpoint domain`)
    }

    if (!/^\d{2,8}:(|test)publickey_.+$/g.test(publicKey)) {
      hasErrors = true
      console.error(`[${publicKey}] is not a valid public key`)
    }

    if (hasErrors) return Promise.reject('Invalid endpoint or public key')

    this.domain = domain
    this.publicKey = publicKey
    this.formToken = formToken

    if (this.domain && this.publicKey) {
      this.loaded = true
      return this.loadKryptonClient()
    }

    return Promise.reject('The library cannot be loaded')
  }

  loadKryptonClient() {
    const publicKey = this.publicKey
    let domain = this.domain

    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.type = 'text/javascript'

      // Domain must end with slash
      if (!/^.+\/$/.test(domain)) {
        domain += '/'
      }

      script.src = `${domain}static/js/krypton-client/V4.0/stable/kr-payment-form.min.js`
      script.setAttribute('kr-public-key', publicKey)
      script.setAttribute('kr-spa-mode', 'true')

      if (this.formToken) {
        script.setAttribute('kr-form-token', this.formToken)
      }

      // Check if the library is already present
      const $script = document.querySelector(`script[src="${script.src}"]`)

      // Append it to body if it's not already loaded
      if (!$script) document.getElementsByTagName('body')[0].appendChild(script)

      whenDefined(window, 'KR', () => {
        resolve({
          KR: window.KR
        })
      })
    })
  }
}

export default new Glue()
