const upload = require('../middlewares/multer').upload;
const XLSXWriteStream = require('xlsx-write-stream');

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
        const xlsxStream = req.xlsxWriter.getOutputStream();
        // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        // res.setHeader("Content-Disposition", "attachment; filename=test.xlsx"); 
        xlsxStream.pipe(res);
    });
    
}