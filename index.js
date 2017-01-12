let path = require('path'),
    zlib = require('zlib'),
    TransformStream = require('stream').Transform;

module.exports = (options = {}) => {

    let stream = new TransformStream({objectMode: true}),
        settings = {
            level: 9
        };

    Object.keys(options).forEach(key => {
        settings[key] = options[key];
    });

    stream._transform = (file, encoding, next) => {

        if (path.extname(file.path).toLowerCase() !== '.svg') {
            return next(null, file);
        }

        if (file.isStream()) {
            return next(null, file);
        }

        if (file.isBuffer()) {

            zlib.gzip(file.contents.toString(), settings, (err, res) => {
                file.contents = new Buffer(res);
                file.path += 'z';

                return next(null, file);
            });
        }
    };

    return stream;
};
