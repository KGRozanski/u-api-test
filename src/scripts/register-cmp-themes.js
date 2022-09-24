const fs = require('fs');
const path = require('path');

(function() {
    const PATH = path.resolve(process.cwd(), './src/assets/scss/themes')


    console.log(PATH)
    fs.readdir(PATH, (err, files) => {
        if(err) { throw err; }

        const switchFileIdx = files.findIndex((el) => el === '__theme-switch.scss');


        if(switchFileIdx > -1) {
            files.splice(switchFileIdx, 1);
            fs.rm(path.resolve(PATH + '/__theme-switch.scss'), (err) => { if (err) {throw err} });
        }

        const parsed
    });
})();