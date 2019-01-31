const router = require('express').Router()
const user = require('../models').User
const file = require('../models').File
const sharefile = require('../models').ShareFile
const storage = require('../helper/storage')
const upload = require('../helper/upload')

router.get('/upload', (req, res) => {
    user.findByPk(req.params.id)
        .then(function(data) {
            res.render('index')
        })
        .catch(function(err) {
            res.send(err)
        })
})

router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {
                msg: err
            })
        } else {
            file.create({
                    name: req.file.filename,
                    path: req.file.path,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                .then(function(data) {
                    sharefile.create({
                        UserId: req.body.UserId,
                        FileId: data.id,
                        limit: 0,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    })
                })
            // console.log(req.file)
            res.send('test')
        }
    })
})

module.exports = router