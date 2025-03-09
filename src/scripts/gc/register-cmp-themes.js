/*
*	THIS FILE IS UNUSED SINCE ANGULAR MATERIAL V18
*
*/

const fs = require('fs');
const path = require('path');

(function () {
	const PATH = path.resolve(process.cwd(), './src/assets/scss/themes');

	fs.readdir(PATH, (err, files) => {
		if (err) {
			throw err;
		}

		const switchFileIdx = files.findIndex((el) => el === '__theme-switch.scss');

		if (switchFileIdx > -1) {
			files.splice(switchFileIdx, 1);

			fs.readFile(PATH + '/__theme-switch.scss', { encoding: 'utf8' }, (err, data) => {
				if (err) {
					throw err;
				}

				let fileContent = data.toString();
				fileContent = insertImports(fileContent, getFileImports(files));

				fileContent = insertMixins(fileContent, files);

				fs.writeFile(PATH + '/__theme-switch.scss', fileContent, (err, data) => {
					if (err) {
						throw err;
					}
				});
			});
		}
	});
})();

/**
 * Returns genereted scss files imports;
 * @param {*} files
 */
function getFileImports(files) {
	let importsCode = '';

	files.forEach((name) => {
		importsCode += "@use './" + name.match(/(?<=_).*(?=.scss)/)[0] + "';\r\n";
	});

	return importsCode;
}

/**
 * Generates mixin includes for all components
 * @param {Array<string>} files
 * @param {'light' | 'dark'} variant
 */
function getFilesIncludes(files, variant) {
	let includesCode = '';

	files.forEach((name) => {
		includesCode +=
			`${variant === 'light' ? '\t' : '\t\t'}` +
			'@include ' +
			name.split('.')[0].replace('_', '') +
			`.theme(${variant === 'light' ? '$default-theme' : '$dark-theme'});\r\n`;
	});

	return includesCode;
}

function insertImports(code, imports) {
	return code.replace(/(?<=(\r.*(\r\n){3})).*(\r\n){3}/s, imports + '\r\n\r\n');
}

function insertMixins(code, files) {
	code = code.replace(
		/(?<=(mat.all-component-themes\(\$default-theme\);)).*(?=\.darkMode)/s,
		`\r\n${getFilesIncludes(files, 'light')}\r\n\t`,
	);
	code = code.replace(
		/(?<=(mat.all-component-colors\(\$dark-theme\);))(.*?)(?=\})/s,
		`\r\n${getFilesIncludes(files, 'dark')}    `,
	);
	return code;
}
