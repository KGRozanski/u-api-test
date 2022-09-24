const fs = require('fs');

(function() {
    const path = process.cwd() + '\\src\\assets\\scss\\themes';

    console.log(path)
    fs.readdir(path, (err, files) => {
        console.log(files);
    });
})();