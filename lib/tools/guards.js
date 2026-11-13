export function assertPublicKey(publicKey) {
  if (!publicKey) {
    throw new TypeError('Public key undefined')
  }
  if (!/^\d{2,8}:(|test)publickey_.+$/.test(publicKey)) {
    console.error('Public key format should be shopId:[test]publickey_*')
    throw new Error(`[${publicKey}] is not a valid public key`)
  }
}
export function assertDomain(domain) {
  if (!domain) {
    throw new TypeError('Domain undefined')
  }
  try {
    const domainUrl = new URL(domain)
    if (!['http:', 'https:'].includes(domainUrl.protocol))
      throw new Error('Invalid protocol')
    if (domainUrl.port) throw new Error('No port allowed')
    if (domainUrl.search !== '') throw new Error('No query params allowed')
    if (domainUrl.pathname !== '/') throw new Error('Invalid path')
    if (domainUrl.hash !== '') throw new Error('No fragments allowed')
  } catch (err) {
    console.error('Domain format should be https://domain.name')
    const errMessage = `[${domain}] is not a valid endpoint domain`
    if (err instanceof Error) {
      throw new Error(`${errMessage}: ${err.message}`)
    } else {
      throw new Error(errMessage)
    }
  }
}
export function assertTheme(theme) {
  if (typeof theme !== 'string' || !theme) {
    throw new TypeError('Unspecified theme')
  }
  if (theme !== 'classic' && theme !== 'neon') {
    throw new TypeError(`Invalid theme "${theme}"`)
  }
}
