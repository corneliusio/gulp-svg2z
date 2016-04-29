var fs = require('fs'),
    path = require('path'),
    Stream = require('stream'),
    zlib = require('zlib');

module.exports = function(options) {

    var stream = new Stream.Transform({objectMode: true}),
        settings = Object.assign({
            level: 9
        }, options);

    stream._transform = function(file, encoding, next) {

        if (!file.checksum) {

            if (path.extname(file.path).toLowerCase() !== '.svg') {
                this.push(file);
                return next();
            }

            if (file.isStream()) {
                this.push(file);
                return next();
            }

            if (file.isBuffer()) {
                console.log(settings);
                file.contents = zlib.deflateSync(file.contents, settings);
                file.path = file.path + 'z';
                this.push(file);
                return next();
            }
        }
    };

    return stream;
};
