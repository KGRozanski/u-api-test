const fs = require('fs');
const path = require('path');

const id = process.argv[2];
const filename = id.split('/')[id.split('/').length - 1];

(function () {
    const content = `
@use "sass:map";
@use "@angular/material" as mat;

@mixin color($theme) {
    // Get the color config from the theme.
    $config: mat.get-color-config($theme);
    // Get the primary color palette from the color-config.
    $primary: map.get($config, primary);



    $background: map.get($config, background);
    $foreground: map.get($config, foreground);



    app-${filename}{







    }
    
}

@mixin typography($theme) {
    // Get the color config from the theme.
    $color-config: mat.get-color-config($theme);

    // Get the foreground color palette from the color-config.
    $palette: map.get($color-config, foreground);

    // Get the typography config from the theme.
    $typography-config: mat.get-typography-config($theme);

    app-${filename} {
        color: mat.get-color-from-palette($palette, text, .9);
    }
}

// For convenience, we can add a theme mixin that includes both color
// and typography. This theme mixin should only emit the styles for
// each color and typography, respectively, if they have a config specified.
@mixin theme($theme) {
    $color-config: mat.get-color-config($theme);

    @if $color-config != null {
        @include color($theme);
    }

    $typography-config: mat.get-typography-config($theme);
    @if $typography-config != null {
        @include typography($theme);
    }
}

    `;

    fs.appendFile(process.cwd() + '/src/assets/scss/themes/_' + filename + '-theme.scss', content, (err, data) => {
        if (err) {
            throw err;
        }
    });
})();
