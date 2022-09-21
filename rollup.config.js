import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
// import { terser } from 'rollup-plugin-terser';

export default {
  input: "source/scripts/index.mjs",
  output: {
    file: "static/js/main.mjs",
    format: "esm",
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({
      babelHelpers: "bundled",
    }),
    // terser(),
  ],
  onwarn(warning, warn) {
    // Surpress D3 warning about circular dependencies: https://github.com/rollup/rollup/pull/1491#issuecomment-321714821
    if (warning.importer === "node_modules/d3-transition/src/transition/index.js") return;
    if (warning.importer === "node_modules/d3-selection/src/selection/index.js") return;
    if (warning.importer === "node_modules/d3-interpolate/src/value.js") return;

    // Use default for everything else
    warn(warning);
  },
};

