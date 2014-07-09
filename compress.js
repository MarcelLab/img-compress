var Imagemin = require('imagemin'),
    jpegRecompress = require('imagemin-jpeg-recompress'),
    find = require('./lib/find-recursive'),
    path = require('path');


var basePath = 'www/assets/chapter_1/part_1/';
var files = find(basePath, /.jpg$/);

console.log('compress %s images', files.length);

files.forEach(function(filename) {

    var file = path.join(basePath, filename);

    var imagemin = new Imagemin()
      .src(file)
      .dest(file)
      .use(jpegRecompress({
        progressive: true,
        loops: 3,
        max: 90
      }));

    imagemin.optimize();

});