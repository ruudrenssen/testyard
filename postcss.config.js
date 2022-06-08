const cssImport = require('postcss-import');
const csso = require('postcss-csso');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
	map: {
		inline: false,
	},
	plugins: [
		cssImport(),
		postcssPresetEnv({
			stage: 3,
			features: {
				'nesting-rules': true,
			},
		}),
		csso({
			sourceMap: true,
		}),
	],
};
