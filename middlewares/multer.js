const multer = require('multer');
const storageCustom = require('../controllers/customStorageEngine');

// for custom multer storage
let upload = multer({
    storage: storageCustom({
        key: function (req, file, cb) {
            cb(null, fullPath)
        }
    })
})

module.exports  ={
    upload
}