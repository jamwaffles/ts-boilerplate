/* eslint-disable @typescript-eslint/no-var-requires */
require("@babel/register")({
  extensions: [".es6", ".es", ".jsx", ".js", ".mjs", ".ts", ".tsx"],
  plugins: [
    // Ignore image asset imports
    [
      "transform-assets-import-to-string",
      {
        baseDir: "/assets",
        baseUri: "",
      },
    ],
  ],
});

const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

Enzyme.configure({ adapter: new Adapter() });
