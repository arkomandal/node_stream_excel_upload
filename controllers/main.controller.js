const upload = require('../middlewares/multer').upload;
const XLSXWriteStream = require('xlsx-write-stream');
const EventEmitter = require('events');
global.eventEmitter = new EventEmitter();

exports.processExcel = function (req, res) {
    req.xlsxWriter = new XLSXWriteStream();
    let u = upload.single('file');

    console.log("starting upload")
    u(req, res, (err) => {
        if (err) {
            console.log(err)
            return res.send({
                success: false,
                message: err.message
            });
        }
        global.eventEmitter.on('process_completed', async (data) => {
            res.send('process completed');
        });
    });
    
}