import whenDefined from './tools/whenDefined'

type KryptonWindow = Window & {
  KR?: KR & { ready?: unknown }
}

export type KRGlue = Glue

class Glue {
  private static instance: Glue | undefined

  readonly _name = 'Krypton Glue'
  configuration: Record<string, unknown> = {}
  domain: string | null = null
  formToken: string | null = null
  publicKey: string | null = null
  loaded = false
  loading = false

  constructor() {
    if (Glue.instance) return Glue.instance

    Glue.instance = this
  }

  /**
   * Load kr-payment-form library
   * @param endpoint - API endpoint (only the base domain, e.g. https://domain.name)
   * @param publicKey - Public key
   * @param formToken? - Form token
   *
   * @example
   *    const {KR} = await KRGlue.loadLibrary('https://domain.name', '12345678:publickey_abcdefghi...')
   */
  loadLibrary(
    domain: string,
    publicKey: string,
    formToken: string | null = null
  ): Promise<{ KR: KR }> {
    const pubKeyRegex = /^\d{2,8}:(|test)publickey_.+$/g

    if (this.loaded) return this.getKrypton(publicKey)
    if (!domain) return Promise.reject('Domain not defined')
    if (!publicKey) return Promise.reject('Public key not defined')

    try {
      const domainUrl = new URL(domain)

      if (!['http:', 'https:'].includes(domainUrl.protocol))
        throw new Error('Invalid protocol')

      if (domainUrl.port) throw new Error('No port allowed')
      if (domainUrl.search !== '') throw new Error('No query params allowed')
      if (domainUrl.pathname !== '/') throw new Error('Invalid path')
    } catch (err) {
      console.error('Domain format should be https://domain.name')
      return Promise.reject(`[${domain}] is not a valid endpoint domain`)
    }

    if (!pubKeyRegex.test(publicKey)) {
      console.error('Public key format should be shopId:[test]publickey_*')
      return Promise.reject(`[${publicKey}] is not a valid public key`)
    }

    this.domain = domain
    this.publicKey = publicKey
    this.formToken = formToken

    if (this.domain && this.publicKey) return this.loadKryptonClient()

    return Promise.reject('The library cannot be loaded')
  }

  private loadKryptonClient(): Promise<{ KR: KR }> {
    if (!this.loading) {
      const publicKey = this.publicKey!
      let domain = this.domain!
      this.loading = true

      const script = document.createElement('script')
      script.type = 'text/javascript'

      if (!/^.+\/$/.test(domain)) domain += '/'

      script.src = `${domain}static/js/krypton-client/V4.0/stable/kr-payment-form.min.js`
      script.setAttribute('kr-public-key', publicKey)
      script.setAttribute('kr-spa-mode', 'true')

      if (this.formToken) script.setAttribute('kr-form-token', this.formToken)

      const existingScript = document.querySelector(
        `script[src="${script.src}"]`
      )

      if (!existingScript && document.body) document.body.appendChild(script)
      else if (!document.body) console.warn('document.body is undefined')
    }

    const kryptonWindow = window as KryptonWindow

    return new Promise(resolve => {
      whenDefined(kryptonWindow, 'KR', () => {
        const krypton = kryptonWindow.KR!

        whenDefined(krypton, 'ready', () => {
          this.loaded = true
          this.loading = false
          resolve({ KR: krypton })
        })
      })
    })
  }

  private getKrypton(publicKey: string): Promise<{ KR: KR }> {
    const krypton = (window as KryptonWindow).KR!

    if (publicKey && publicKey !== this.publicKey) {
      return krypton.setFormConfig({ publicKey })
    }

    return Promise.resolve({ KR: krypton })
  }
}

export default new Glue()
