import type {
  KryptonWindow,
  KryptonTheme,
  KryptonGlueConfiguration
} from './types'
import whenDefined from './tools/whenDefined'
import { assertDomain, assertPublicKey, assertTheme } from './tools/guards'
import {
  forceAppendElement,
  getClientScriptElement,
  getThemeElements,
  onceLoaded,
  setConfigValue
} from './tools/utils'

export type KRGlue = Glue

class Glue {
  readonly _name = 'Krypton Glue'
  private static instance: Glue | undefined
  private configuration: KryptonGlueConfiguration = {
    domain: null,
    formToken: null,
    publicKey: null
  }

  private loaded = false
  private loading = false
  private loadedPublicKey: string | null = null

  constructor() {
    if (Glue.instance) return Glue.instance

    Glue.instance = this
  }

  /**
   * Set or update configuration used by subsequent glue calls. Omitted values remain unchanged;
   * explicitly passing `null` clears a value.
   *
   * @param opts - Configuration values to update.
   *
   * @example
   *    KRGlue.configure({
   *      domain: 'https://domain.name',
   *      publicKey: '12345678:publickey_abcdefghi...',
   *      formToken: 'FORM-TOKEN'
   *    })
   */
  configure(opts: Partial<KryptonGlueConfiguration>): void {
    for (const key of Object.keys(opts) as (keyof KryptonGlueConfiguration)[]) {
      const value = opts[key]

      if (value !== undefined) {
        setConfigValue(
          this.configuration,
          key,
          value as KryptonGlueConfiguration[typeof key]
        )
      }
    }
  }

  /**
   * Load the CSS and JavaScript assets for the selected theme from the configured domain.
   * Resolves after both assets load, or rejects if the domain is missing or invalid, or an asset
   * fails to load.
   *
   * @param theme - Theme whose assets should be loaded.
   * @returns A promise that resolves when both assets have loaded.
   *
   * @example
   *    await KRGlue.loadTheme('material')
   */
  loadTheme(theme: KryptonTheme): Promise<void> {
    return new Promise((resolve, reject) => {
      assertTheme(theme)

      const { domain } = this.configuration
      if (domain) {
        assertDomain(domain)
        const { link, script } = getThemeElements(domain, theme)

        Promise.all([onceLoaded(link), onceLoaded(script)])
          .then(() => resolve())
          .catch(e => reject(e))

        forceAppendElement(link)
        forceAppendElement(script)
      } else {
        reject(new Error(`Could not load theme: domain is undefined`))
      }
    })
  }

  /**
   * Load the payment form library and return its `KR` instance. Options override configured
   * values; omitted values fall back to the configuration set with `configure`. When the library
   * is already loaded, only a changed public key is applied; a form token is passed to the SDK
   * script during an initial load.
   *
   * @param opts - Configuration values for this load.
   * @returns A promise that resolves with the `KR` instance.
   *
   * @example
   *    const {KR} = await KRGlue.loadLibrary({
   *      domain: 'https://domain.name',
   *      publicKey: '12345678:publickey_abcdefghi...'
   *    })
   */
  loadLibrary(
    opts: Partial<KryptonGlueConfiguration> = {}
  ): Promise<{ KR: KR }> {
    const domain = opts.domain ?? this.configuration.domain
    const publicKey = opts.publicKey ?? this.configuration.publicKey
    const formToken = opts.formToken ?? this.configuration.formToken

    try {
      assertPublicKey(publicKey)

      if (this.loaded) return this.getKrypton(publicKey, formToken)

      assertDomain(domain)
      return this.loadKryptonClient({ domain, publicKey, formToken })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  private loadKryptonClient(opts: {
    domain: string
    publicKey: string
    formToken: string | null
  }): Promise<{ KR: KR }> {
    const { domain, publicKey, formToken } = opts

    if (!this.loading) {
      this.loading = true

      const script = getClientScriptElement(domain)

      script.setAttribute('kr-public-key', publicKey)

      if (formToken) script.setAttribute('kr-form-token', formToken)

      const existingScript = document.querySelector(
        `script[src="${script.src}"]`
      )

      if (!document.body) throw new Error('document.body is undefined')
      if (!existingScript) document.body.appendChild(script)
      this.loadedPublicKey = publicKey
    }

    const kryptonWindow = window as KryptonWindow

    return new Promise(resolve => {
      whenDefined(kryptonWindow, 'KR', () => {
        const krypton = kryptonWindow.KR!

        whenDefined(krypton, 'ready', () => {
          this.loadedPublicKey = publicKey
          this.loaded = true
          this.loading = false
          resolve({ KR: krypton })
        })
      })
    })
  }

  private getKrypton(
    publicKey: string,
    formToken: string | null
  ): Promise<{ KR: KR }> {
    const krypton = (window as KryptonWindow).KR!

    if (publicKey !== this.loadedPublicKey) {
      // Update formToken
      const config: KRConfig = { publicKey }
      if (formToken) config.formToken = formToken
      return krypton.setFormConfig(config).then(result => {
        this.loadedPublicKey = publicKey
        return result
      })
    }

    return Promise.resolve({ KR: krypton })
  }
}

export default new Glue()
