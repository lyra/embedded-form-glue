/// <reference path="../../../index.d.ts" />

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type {
  KryptonGlueConfiguration,
  KryptonGlueLoadLibraryParameter,
  KryptonTheme
} from '../../../app/types'
import KryptonGlue from '../../../app'

const options = {
  domain: 'https://test.com',
  publicKey: '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5'
}
const result = { KR: {} as KR }

type GlueInternals = {
  configuration: KryptonGlueConfiguration
  loadTheme: (theme: KryptonTheme) => Promise<void>
  loadLibrary: (opts?: KryptonGlueLoadLibraryParameter) => Promise<{ KR: KR }>
}

describe('KRGlue.load', () => {
  let glue: GlueInternals

  beforeEach(() => {
    glue = KryptonGlue as unknown as GlueInternals
    glue.configuration = { domain: null, publicKey: null, formToken: null }
    vi.spyOn(glue, 'loadTheme').mockResolvedValue()
    vi.spyOn(glue, 'loadLibrary').mockResolvedValue(result)
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('updates configuration, defaults to neon, and loads the library', async () => {
    const loadOptions = { ...options, formToken: 'FORM-TOKEN' }

    await expect(KryptonGlue.load(loadOptions)).resolves.toBe(result)

    expect(glue.configuration).toEqual({
      ...options,
      formToken: 'FORM-TOKEN'
    })
    expect(glue.loadTheme).toHaveBeenCalledWith('neon')
    expect(glue.loadLibrary).toHaveBeenCalledWith(loadOptions)
  })

  it('loads the selected theme', async () => {
    await KryptonGlue.load({ ...options, theme: 'classic' })

    expect(glue.loadTheme).toHaveBeenCalledWith('classic')
    expect(glue.loadLibrary).toHaveBeenCalledOnce()
  })

  it('skips theme loading when theme is null', async () => {
    await KryptonGlue.load({ ...options, theme: null })

    expect(glue.loadTheme).not.toHaveBeenCalled()
    expect(glue.loadLibrary).toHaveBeenCalledWith({
      ...options,
      theme: null
    })
  })

  it('rejects invalid domain or public key before configuring or loading', async () => {
    await expect(KryptonGlue.load({ ...options, domain: '' })).rejects.toThrow(
      'Domain undefined'
    )
    await expect(
      KryptonGlue.load({ ...options, publicKey: 'invalid' })
    ).rejects.toThrow(/is not a valid public key$/)

    expect(glue.configuration).toEqual({
      domain: null,
      publicKey: null,
      formToken: null
    })
    expect(glue.loadTheme).not.toHaveBeenCalled()
    expect(glue.loadLibrary).not.toHaveBeenCalled()
  })

  it('does not load the library when theme loading fails', async () => {
    vi.spyOn(glue, 'loadTheme').mockRejectedValue(new Error('theme failed'))

    await expect(KryptonGlue.load(options)).rejects.toThrow('theme failed')

    expect(glue.loadLibrary).not.toHaveBeenCalled()
  })
})
