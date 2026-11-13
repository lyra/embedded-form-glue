export type Maybe<T> = T | null | undefined;
export type KryptonWindow = Window & {
    KR?: KR & {
        ready?: unknown;
    };
};
export type KryptonTheme = 'classic' | 'material' | 'neon';
export interface KryptonGlueConfiguration {
    domain: string | null;
    formToken: string | null;
    publicKey: string | null;
}
