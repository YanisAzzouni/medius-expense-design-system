/** All color steps for a single color family. */
export interface ColorFamily {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    1000: string;
}
/** Base (white / black) tokens. */
export interface BaseColors {
    white: string;
    black: string;
}
/** Full color token map. */
export interface Colors {
    olive: ColorFamily;
    chalk: ColorFamily;
    base: BaseColors;
    blue: ColorFamily;
    green: ColorFamily;
    red: ColorFamily;
    orange: ColorFamily;
    yellow: ColorFamily;
    teal: ColorFamily;
    purple: ColorFamily;
    pink: ColorFamily;
}
export declare const colors: Colors;
type CSSPropertyRecord = Record<string, string>;
/** Generates a flat CSS custom-property map for all color tokens. */
export declare function generateColorCSSVars(): CSSPropertyRecord;
export {};
