const fs = require('fs');
const path = require('path');

(function() {
    let resolved = path.resolve(process.cwd(), './src/assets/scss/themes')

    console.log('platform: ' + process.platform);
    console.log(resolved)
    fs.readdir(resolved, (err, files) => {
        if(err) { throw err; }

        const switchFileIdx = files.findIndex('__theme-switch.scss');

        if(switchFileIdx > -1) {

        }
    });
})();