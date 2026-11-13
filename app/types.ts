export type Maybe<T> = T | null | undefined
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}

export type KryptonWindow = Window & {
  KR?: KR & { ready?: unknown }
}

export type KryptonTheme = 'classic' | 'neon'

export interface KryptonGlueConfiguration {
  domain: string | null
  publicKey: string | null
  formToken: string | null
}

export interface KryptonGlueLoadParameter {
  domain: string
  publicKey: string
  formToken?: string
  theme?: KryptonTheme | null
}

export type KryptonGlueConfigureParameter = Pick<
  KryptonGlueLoadParameter,
  'domain' | 'publicKey' | 'formToken'
>

export type KryptonGlueLoadLibraryParameter = Pick<
  KryptonGlueLoadParameter,
  'formToken'
>
