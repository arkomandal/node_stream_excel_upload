const excel = require('excel-stream') // package to read excel to objects in stream
const getTransformObject = require('./customLogic').getTransformObject;

function getDestination(req, file, cb) {
    cb(null, '')
}

function MyCustomStorage(opts) {
    this.getDestination = (opts.destination || getDestination)
}

MyCustomStorage.prototype._handleFile = function _handleFile(req, file, cb) {

    // set input stream for xlsxWriter stream which will be used to downlaod excel
    req.xlsxWriter.setInputStream(
        // stream of input file
        file.stream
            // convert excel to object stream
            .pipe(excel())
            //process object stream and return formated object for xlsxWriter
            .pipe(getTransformObject())
    );
    cb(null, {
        path: '',
        size: 0
    })
}

MyCustomStorage.prototype._removeFile = function _removeFile(req, file, cb) {
    fsImpl.unlink(file.path, cb)
}

module.exports = function (opts) {
    return new MyCustomStorage(opts)
}

