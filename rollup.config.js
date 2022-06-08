import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import { terser } from 'rollup-plugin-terser';

export default {
	input: 'source/scripts/index.mjs',
	output: {
		file: 'static/js/main.mjs',
		format: 'esm',
	},
	plugins: [
		commonjs(),
		nodeResolve(),
		babel({
			babelHelpers: 'bundled',
		}),
		// terser(),
	],
};
