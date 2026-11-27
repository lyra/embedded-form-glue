import type { Maybe, KryptonTheme } from '../types';
export declare function assertPublicKey(publicKey: Maybe<string>): asserts publicKey is string;
export declare function assertDomain(domain: Maybe<string>): asserts domain is string;
export declare function assertTheme(theme: Maybe<string>): asserts theme is KryptonTheme;
