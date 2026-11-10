export type KRGlue = Glue;
declare class Glue {
    private static instance;
    readonly _name = "Krypton Glue";
    configuration: Record<string, unknown>;
    domain: string | null;
    formToken: string | null;
    publicKey: string | null;
    loaded: boolean;
    loading: boolean;
    constructor();
    /**
     * Load kr-payment-form library
     * @param endpoint - API endpoint (only the base domain, e.g. https://domain.name)
     * @param publicKey - Public key
     * @param formToken? - Form token
     *
     * @example
     *    const {KR} = await KRGlue.loadLibrary('https://domain.name', '12345678:publickey_abcdefghi...')
     */
    loadLibrary(domain: string, publicKey: string, formToken?: string | null): Promise<{
        KR: KR;
    }>;
    private loadKryptonClient;
    private getKrypton;
}
declare const _default: Glue;
export default _default;
