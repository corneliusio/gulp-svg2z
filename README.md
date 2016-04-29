# gulp-svg2z
Gzip SVG vector graphics files with Gulp

Will pass-through any non-svg files unaltered so you can use in conjuction with other image optimzation tools if you don't want a separate task for different file formats.

## Install

```
$ npm install --save-dev gulp-svg2z
```


## Usage

```js
var gulp = require('gulp'),
    svg2z = require('gulp-svg2z');

gulp.task('default', function() {

    gulp.src('src/img/*')
        .pipe(svg2z())
        .pipe(gulp.dest('dest/img'));
});
```


## Options

Options are passed directly to [zlib](https://nodejs.org/api/zlib.html). Details can be found [here](https://nodejs.org/api/zlib.html#zlib_class_options).

Only default is compression level set to max. `{level: 9}`


## Extra Credit

For extra (very small) savings on file size, use in conjuction with [gulp-svgo](https://www.npmjs.com/package/gulp-svgo) (or any other svgo optimization). If every byte counts, this is an easy way to up the savings, but be aware that this probably wont make a huge impact on your compression.

#### Example

```js
var gulp = require('gulp'),
    svgo = require('gulp-svgo'),
    svg2z = require('gulp-svg2z');

gulp.task('default', function() {

    gulp.src('src/img/*')
        .pipe(svgo())
        .pipe(svg2z())
        .pipe(gulp.dest('dest/img'));
});
```
