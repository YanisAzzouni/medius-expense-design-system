/** A single typography style definition. */
export interface TypographyStyle {
    fontFamily: string;
    fontWeight: number;
    fontSize: number;
    lineHeight: string;
    letterSpacing: string;
    fontStyle?: string;
}
/** All heading-level type styles. */
export interface HeadingStyles {
    impact: TypographyStyle;
    impactSmall: TypographyStyle;
    h1: TypographyStyle;
    h2: TypographyStyle;
    h3: TypographyStyle;
    h4: TypographyStyle;
    title: TypographyStyle;
}
/** All body-level type styles. */
export interface BodyStyles {
    bodyDefault: TypographyStyle;
    bodySemibold: TypographyStyle;
    bodyBold: TypographyStyle;
    bodyItalic: TypographyStyle;
    small: TypographyStyle;
    smallSemibold: TypographyStyle;
    smallBold: TypographyStyle;
}
export declare const headings: HeadingStyles;
export declare const body: BodyStyles;
/** All typography token definitions. */
export declare const typography: {
    headings: HeadingStyles;
    body: BodyStyles;
};
type CSSPropertyRecord = Record<string, string>;
/** Generates CSS custom properties for typography tokens. */
export declare function generateTypographyCSSVars(): CSSPropertyRecord;
export {};
