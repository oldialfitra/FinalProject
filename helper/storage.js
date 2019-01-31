const multer = require('multer')
const path = require('path')

//Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/upload/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname))
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|pdf|doc/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb('Error, extension only jpeg,jpg,png,gif,pdf,txt,doc')
    }
}

module.exports = [storage, checkFileType]