import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: './source/js/index.mjs',
    output: {
        file: './public/index.mjs',
        format: 'esm'
    },
    plugins: [nodeResolve()]
}