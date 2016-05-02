var fs = require('fs'),
    path = require('path'),
    Stream = require('stream'),
    zlib = require('zlib');

module.exports = function(options) {

    var stream = new Stream.Transform({objectMode: true}),
        settings = {
            level: 9
        };

    for (var key in options) {
        settings[key] = options[key];
    }

    stream._transform = function(file, encoding, next) {

        if (path.extname(file.path).toLowerCase() !== '.svg') {
            this.push(file);
            return next();
        }

        if (file.isStream()) {
            this.push(file);
            return next();
        }

        if (file.isBuffer()) {
            file.contents = zlib.deflateSync(file.contents, settings);
            file.path = file.path + 'z';
            this.push(file);
            return next();
        }
    };

    return stream;
};
