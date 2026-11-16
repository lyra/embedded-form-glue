import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import KryptonGlue from 'app'
const pubkey = '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5'
const rotatedPubkey = '69876357:testpublickey_ANOTHERDEMO'
const testCases = [
  {
    params: {
      domain: '',
      pubkey
    },
    expected: { valid: false }
  },
  {
    params: {
      domain: 'http',
      pubkey
    },
    expected: { valid: false }
  },
  {
    params: {
      domain: 'http://',
      pubkey
    },
    expected: { valid: false }
  },
  {
    params: {
      domain: 'http://test',
      pubkey
    },
    expected: { valid: true }
  },
  {
    params: {
      domain: 'http://test.com',
      pubkey
    },
    expected: { valid: true }
  },
  {
    params: {
      domain: 'http://test.com/',
      pubkey
    },
    expected: { valid: true }
  },
  {
    params: {
      domain: 'http://test.com/test',
      pubkey
    },
    expected: { valid: false }
  },
  {
    params: {
      domain: 'http://test.com?',
      pubkey
    },
    expected: { valid: true }
  },
  {
    params: {
      domain: 'http://test.com?a=b',
      pubkey
    },
    expected: { valid: false }
  },
  {
    params: {
      domain: 'http://test.com/test?a=b',
      pubkey
    },
    expected: { valid: false }
  },
  {
    params: {
      domain: 'ftp://test.com',
      pubkey
    },
    expected: { valid: false }
  },
  {
    params: {
      domain: 'https://test.com',
      pubkey
    },
    expected: { valid: true }
  },
  {
    params: {
      domain: 'https://test.com/#fragment',
      pubkey
    },
    expected: { valid: false }
  }
]

describe('KRGlue.loadLibrary', () => {
  let KRGlue
  beforeEach(() => {
    KRGlue = KryptonGlue
    KRGlue.configure({
      domain: null,
      formToken: null,
      publicKey: null,
      theme: null
    })
    KRGlue.loaded = false
    KRGlue.loadedPublicKey = null
    KRGlue.loadKryptonClient = vi
      .fn()
      .mockResolvedValue({ KR: { mockedKRValue: true } })
    vi.spyOn(console, 'error').mockImplementation(vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  testCases.forEach(({ params: { domain, pubkey }, expected: { valid } }) => {
    it(`domain validation for ${domain}`, async () => {
      if (valid) {
        const res = await KryptonGlue.loadLibrary({ domain, publicKey: pubkey })
        expect(res).toStrictEqual({
          KR: { mockedKRValue: true }
        })
      } else {
        await expect(
          Promise.resolve().then(() =>
            KryptonGlue.loadLibrary({ domain, publicKey: pubkey })
          )
        ).rejects.toThrowError()
      }
    })
  })

  it('accepts the same valid public key repeatedly', async () => {
    const config = { domain: 'https://test.com', publicKey: pubkey }

    await expect(KRGlue.loadLibrary(config)).resolves.toStrictEqual({
      KR: { mockedKRValue: true }
    })
    await expect(KRGlue.loadLibrary(config)).resolves.toStrictEqual({
      KR: { mockedKRValue: true }
    })
  })

  it('updates the public key for an already loaded SDK', async () => {
    const setFormConfig = vi.fn().mockResolvedValue({ KR: {} })
    vi.stubGlobal('window', { KR: { setFormConfig } })
    KRGlue.loaded = true
    KRGlue.loadedPublicKey = pubkey

    await KRGlue.loadLibrary({ publicKey: rotatedPubkey })

    expect(setFormConfig).toHaveBeenCalledWith({ publicKey: rotatedPubkey })
    expect(KRGlue.loadedPublicKey).toBe(rotatedPubkey)
  })

  it('does not replace the active key when the SDK update fails', async () => {
    const setFormConfig = vi.fn().mockRejectedValue(new Error('update failed'))
    vi.stubGlobal('window', { KR: { setFormConfig } })
    KRGlue.loaded = true
    KRGlue.loadedPublicKey = pubkey

    await expect(
      KRGlue.loadLibrary({ publicKey: rotatedPubkey })
    ).rejects.toThrow('update failed')
    expect(KRGlue.loadedPublicKey).toBe(pubkey)
  })

  it('rejects an invalid key before updating an already loaded SDK', async () => {
    const setFormConfig = vi.fn()
    vi.stubGlobal('window', { KR: { setFormConfig } })
    KRGlue.loaded = true
    KRGlue.loadedPublicKey = pubkey

    await expect(
      KRGlue.loadLibrary({ publicKey: 'INVALID_PUBLIC_KEY' })
    ).rejects.toThrow(/is not a valid public key$/)
    expect(setFormConfig).not.toHaveBeenCalled()
  })
})
