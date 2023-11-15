import { beforeAll, describe, expect, it, vi } from 'vitest'
import KryptonGlue from 'app'
const pubkey = '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5'
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
  ,
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
  }
]

describe('KRGlue.loadLibrary', () => {
  let KRGlue
  beforeAll(() => {
    KRGlue = KryptonGlue
    KRGlue.loadKryptonClient = vi
      .fn()
      .mockReturnValue({ KR: { mockedKRValue: true } })
    vi.spyOn(console, 'error').mockImplementation(vi.fn())
  })

  testCases.forEach(({ params: { domain, pubkey }, expected: { valid } }) => {
    it(`domain validation for ${domain}`, async () => {
      if (valid) {
        const res = await KryptonGlue.loadLibrary(domain, pubkey)
        expect(res).toStrictEqual({
          KR: { mockedKRValue: true }
        })
      } else {
        expect(KryptonGlue.loadLibrary(domain, pubkey)).rejects.toThrowError()
      }

      // if (valid) exp = exp.not

      // exp.toThrowError()

      // try {
      //   expect(true).toBe(false)

      //   const { KR } = await KryptonGlue.loadLibrary(domain, pubkey)
      //   console.log(KR)
      //   // let exp = expect(KR)
      //   // if (!valid) exp.not
      //   // exp.toBeTruthy()
      //   expect(true).toBe(false)
      // } catch (err) {
      //   console.log('error')
      //   if (valid) throw err
      // }
    })
  })
})
