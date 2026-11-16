import { beforeEach, describe, expect, it } from 'vitest'
import type { KryptonGlueConfiguration } from '../../../app/types'
import KryptonGlue from 'app'

const initialConfiguration: KryptonGlueConfiguration = {
  domain: 'https://initial.test',
  publicKey: 'initial-public-key',
  formToken: 'initial-form-token'
}

function getConfiguration(): KryptonGlueConfiguration {
  return (
    KryptonGlue as unknown as {
      configuration: KryptonGlueConfiguration
    }
  ).configuration
}

describe('KRGlue.configure', () => {
  beforeEach(() => {
    KryptonGlue.configure(initialConfiguration)
  })

  it('updates the provided configuration values', () => {
    const updatedConfiguration: KryptonGlueConfiguration = {
      domain: 'https://updated.test',
      publicKey: 'updated-public-key',
      formToken: 'updated-form-token'
    }

    KryptonGlue.configure(updatedConfiguration)

    expect(getConfiguration()).toEqual(updatedConfiguration)
  })

  it('preserves omitted and undefined configuration values', () => {
    KryptonGlue.configure({
      publicKey: 'updated-public-key',
      formToken: undefined
    })

    expect(getConfiguration()).toEqual({
      domain: initialConfiguration.domain,
      publicKey: 'updated-public-key',
      formToken: initialConfiguration.formToken
    })
  })

  it('clears values explicitly set to null', () => {
    KryptonGlue.configure({ domain: null, formToken: null })

    expect(getConfiguration()).toEqual({
      domain: null,
      publicKey: initialConfiguration.publicKey,
      formToken: null
    })
  })
})
