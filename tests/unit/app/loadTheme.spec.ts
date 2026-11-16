import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { KryptonTheme } from '../../../app/types'
import KryptonGlue from 'app'

class FakeLink {
  id = ''
  href = ''
  rel = ''
  type = ''
  onload: (() => void) | null = null
  onerror: (() => void) | null = null
}

class FakeScript {
  id = ''
  src = ''
  type = ''
  onload: (() => void) | null = null
  onerror: (() => void) | null = null
}

let appendedElements: Array<FakeLink | FakeScript>

describe('KRGlue.loadTheme', () => {
  beforeEach(() => {
    KryptonGlue.configure({ domain: null, formToken: null, publicKey: null })
    appendedElements = []

    vi.stubGlobal('HTMLLinkElement', FakeLink)
    vi.stubGlobal('HTMLScriptElement', FakeScript)
    vi.stubGlobal('document', {
      createElement: vi.fn((tagName: string) =>
        tagName === 'link' ? new FakeLink() : new FakeScript()
      ),
      querySelector: vi.fn(() => null),
      head: {
        appendChild: vi.fn((element: FakeLink | FakeScript) => {
          appendedElements.push(element)
          return element
        }),
        removeChild: vi.fn()
      }
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('loads and appends the selected theme assets', async () => {
    KryptonGlue.configure({ domain: 'https://test.com' })

    const loading = KryptonGlue.loadTheme('neon')
    const link = appendedElements[0] as FakeLink
    const script = appendedElements[1] as FakeScript

    expect(link.href).toBe(
      'https://test.com/static/js/krypton-client/V4.0/ext/neon-reset.min.css'
    )
    expect(script.src).toBe(
      'https://test.com/static/js/krypton-client/V4.0/ext/neon.js'
    )
    expect(appendedElements).toHaveLength(2)

    link.onload?.()
    script.onload?.()
    await expect(loading).resolves.toBeUndefined()
  })

  it('rejects when the domain has not been configured', async () => {
    await expect(KryptonGlue.loadTheme('neon')).rejects.toThrow(
      'domain is undefined'
    )
    expect(appendedElements).toHaveLength(0)
  })

  it('rejects an unsupported theme', async () => {
    KryptonGlue.configure({ domain: 'https://test.com' })

    await expect(
      KryptonGlue.loadTheme('unsupported' as KryptonTheme)
    ).rejects.toThrow('Invalid theme "unsupported"')
    expect(appendedElements).toHaveLength(0)
  })

  it('rejects when a theme asset fails to load', async () => {
    KryptonGlue.configure({ domain: 'https://test.com' })

    const loading = KryptonGlue.loadTheme('neon')
    const link = appendedElements[0] as FakeLink

    link.onerror?.()

    await expect(loading).rejects.toBeUndefined()
  })
})
