/** A single icon entry in the design system manifest. */
export interface IconManifestEntry {
    /** Icon name without category prefix (e.g. "chevron-right"). */
    name: string;
    /** Icon category (e.g. "navigation"). */
    category: string;
    /** PascalCase React component name (e.g. "NavigationChevronRight"). */
    componentName: string;
}
export declare const iconManifest: IconManifestEntry[];
export declare const iconNames: string[];
