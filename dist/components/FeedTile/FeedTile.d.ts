export type FeedTileVariant = "number" | "text" | "network";
export type FeedTileNumberColor = "default" | "success";
export interface FeedTileProps {
    /** Label shown above the value. */
    label: string;
    /** Controls how the value is rendered. */
    variant?: FeedTileVariant;
    /** Used for "number" and "text" variants. */
    value?: string | number;
    /** Color override for the "number" variant. "success" renders green (e.g. unmatched = 0). */
    numberColor?: FeedTileNumberColor;
    /** Used for the "network" variant — URL to the network logo image. */
    logoSrc?: string;
    /** Alt text for the network logo. Falls back to text when no logoSrc. */
    logoAlt?: string;
    className?: string;
}
export declare const FeedTile: import('react').ForwardRefExoticComponent<FeedTileProps & import('react').RefAttributes<HTMLDivElement>>;
