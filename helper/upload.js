const storage = require('./storage')
const multer = require('multer')

//init upload
const upload = multer({
    storage: storage[0],
    fileFilter: function(req, file, cb) {
        storage[1](file, cb)
    }
}).single('myFile')

module.exports = upload