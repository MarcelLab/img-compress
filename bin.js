#!/usr/bin/env node
var prompt = require('prompt')
  , fs = require('fs')
  , findR = require('./lib/find-recursive')
  , path = require('path')
  , Imagemin = require('image-min')
  , jpegRecompress = require('imagemin-jpeg-recompress')
;

prompt.message = '[jpegcompress]'.green;
// prompt.delimiter = ' > '.green;

var schema = {
    properties: {
        folder: {
            name: 'folder',
            description: 'define your folder (default current)',
            message: 'the given folder does not exists',
            default: '.',
            conform: function(value) {
                return fs.existsSync(value);
            }
        },
        // imagemin-jpeg-recompress configuration
        progressive: {
            name: 'progressive',
            description: '[jpeg] use progressive (Y/n)',
            pattern: /^(y|n)$/,
            default: 'y',
            before: function(value) {
                return (value === 'y') ? true : false;
            }
        },

        maxQuality: {
            name: 'maxQuality',
            description: '[jpeg] define max quality',
            pattern: /[0-9]{1,3}/,
            default: 90,
            before: function(value) {
                value = parseInt(value, 10);
                if (value > 100) { value = 100 }
                if (value < 0) { value = 0 }
                return value;
            }
        },

        optimizationLevel: {
            name: 'optimizationLevel',
            description: '[png] define optimization level',
            pattern: /[0-7]{1}/,
            default: 3
        }
    }
}

prompt.start();

prompt.get(schema, function(err, result) {
    if (err) { return; }

    var jpgFiles = findR(result.folder, /(.jpg|.jpeg)$/i);
    var pngFiles = findR(result.folder, /.png$/);
    console.log('[jpegcompress] %s .png to compress', pngFiles.length);
    console.log('[jpegcompress] %s .jpg to compress', jpgFiles.length);

    jpgFiles.forEach(function(filename) {
        var file = path.join(result.folder, filename);

        var imagemin = new Imagemin()
          .src(file)
          .dest(file)
          .use(jpegRecompress({
            progressive: result.progressive,
            loops: 3,
            max: result.maxQuality
          }));

        imagemin.optimize();
    });

    pngFiles.forEach(function(filename) {
        var file = path.join(result.folder, filename);

        var imagemin = new Imagemin()
          .src(file)
          .dest(file)
          .use(Imagemin.svgo())
          .use(Imagemin.pngquant())
          .use(Imagemin.optipng({ optimizationLevel: result.optimizationlevel }));

        imagemin.optimize();
    });
});

