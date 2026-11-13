import type { KryptonTheme } from '../types';
export declare function setConfigValue<T, K extends keyof T>(config: T, key: K, value: T[K]): void;
export declare function createStylesheetLink(href: string): HTMLLinkElement;
export declare function createThemeScript(src: string): HTMLScriptElement;
export declare function createClientScript(src: string): HTMLScriptElement;
export declare function getThemeElements(domain: string, theme: KryptonTheme): {
    link: HTMLLinkElement;
    script: HTMLScriptElement;
};
export declare function getClientScriptElement(domain: string): HTMLScriptElement;
export declare function forceAppendElement(element: HTMLLinkElement | HTMLScriptElement): void;
export declare function onceLoaded(element: HTMLLinkElement | HTMLScriptElement): Promise<void>;
