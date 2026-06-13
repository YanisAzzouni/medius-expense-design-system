import * as React from "react";
interface SVGProps extends React.SVGProps<SVGSVGElement> {
    width?: number | string;
    height?: number | string;
}
declare function ActionCheck({ width, height, ...props }: SVGProps): import("react/jsx-runtime").JSX.Element;
export default ActionCheck;
