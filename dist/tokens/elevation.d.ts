/** All elevation (shadow) token definitions. */
export interface ElevationTokens {
    /** Subtle shadow for floating elements like cards and dropdowns. */
    shadow16: string;
    /** Stronger shadow for modals and overlays. */
    shadow32: string;
    /** Inset bottom border used to separate adjacent regions. */
    bottomLine: string;
}
export declare const elevation: ElevationTokens;
type CSSPropertyRecord = Record<string, string>;
/** Generates CSS custom properties for elevation tokens. */
export declare function generateElevationCSSVars(): CSSPropertyRecord;
export {};
