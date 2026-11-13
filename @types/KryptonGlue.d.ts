import type { KryptonGlueLoadParameter } from './types';
export type KRGlue = Glue;
declare class Glue {
    readonly _name = "Krypton Glue";
    private static instance;
    private configuration;
    private loaded;
    private loading;
    private loadedPublicKey;
    constructor();
    /**
     * Set or update configuration used by subsequent glue calls. Omitted values remain unchanged;
     * explicitly passing `null` clears a value.
     *
     * @param opts - Configuration values to update.
     *
     * @example
     *    await KRGlue.load({
     *      domain: 'https://domain.name',
     *      publicKey: '12345678:publickey_abcdefghi...',
     *      formToken: 'FORM-TOKEN',
     *      theme: 'neon'
     *    })
     */
    load(opts: KryptonGlueLoadParameter): Promise<{
        KR: KR;
    }>;
    /**
     * Set or update configuration used by subsequent glue calls. Omitted values remain unchanged;
     * explicitly passing `null` clears a value.
     *
     * @param opts - Configuration values to update.
     *
     * @example
     *    KRGlue.configure({
     *      domain: 'https://domain.name',
     *      publicKey: '12345678:publickey_abcdefghi...',
     *      formToken: 'FORM-TOKEN'
     *    })
     */
    private configure;
    /**
     * Load the CSS and JavaScript assets for the selected theme from the configured domain.
     * Resolves after both assets load, or rejects if the domain is missing or invalid, or an asset
     * fails to load.
     *
     * @param theme - Theme whose assets should be loaded.
     * @returns A promise that resolves when both assets have loaded.
     *
     * @example
     *    await KRGlue.loadTheme('material')
     */
    private loadTheme;
    /**
     * Load the payment form library and return its `KR` instance. Options override configured
     * values; omitted values fall back to the configuration set with `configure`. When the library
     * is already loaded, only a changed public key is applied; a form token is passed to the SDK
     * script during an initial load.
     *
     * @param opts - Configuration values for this load.
     * @returns A promise that resolves with the `KR` instance.
     *
     * @example
     *    const {KR} = await KRGlue.loadLibrary({
     *      domain: 'https://domain.name',
     *      publicKey: '12345678:publickey_abcdefghi...'
     *    })
     */
    private loadLibrary;
    private loadKryptonClient;
    private getKrypton;
}
declare const _default: Glue;
export default _default;
