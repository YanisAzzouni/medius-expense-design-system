/** @type {import('@svgr/core').Config} */
export default {
  typescript: true,
  jsxRuntime: "automatic",
  svgProps: {
    "aria-hidden": "true",
  },
  replaceAttrValues: {
    // Strip hardcoded fills/strokes so icons inherit color via currentColor
    "#000": "currentColor",
    "#000000": "currentColor",
    "#fff": "currentColor",
    "#ffffff": "currentColor",
    black: "currentColor",
    white: "currentColor",
  },
  template: ({ componentName, props, jsx, exports }, { tpl }) => tpl`
import * as React from 'react';

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

function ${componentName}({ width = 20, height = 20, ...props }: SVGProps) {
  return (
    ${jsx}
  );
}

${exports}
`,
  plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx", "@svgr/plugin-prettier"],
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      "removeDimensions",
    ],
  },
};
