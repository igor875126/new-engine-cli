import executable from 'rollup-plugin-executable'

module.exports = {
    input: 'build/new-engine-cli.js', // Entry file
    plugins: [executable()],
    output: {
        file: 'bin/new-engine',
        format: 'cjs', // Compiles to CJS
        banner: '#!/usr/bin/env node' // Adds node shebang on top of the file
    }
};
