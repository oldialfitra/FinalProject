const router = require('express').Router()
const user = require('../models').User
const file = require('../models').File
const sharefile = require('../models').ShareFile
const storage = require('../helper/storage')
const upload = require('../helper/upload')

router.get('/:id/list', (req, res) => {
    sharefile.findAll({
            where: {
                UserId: req.params.id
            },
            include: {
                model: file
            }
        })
        .then(function(data) {
            // res.send(data)
            res.render('list', { output: data })
        })
        .catch(function(err) {
            res.send(err)
        })
})

router.get('/:id/upload', (req, res) => {
    user.findByPk(req.params.id)
        .then(function(data) {
            // res.send(data)
            res.render('index', { output: data })
        })
        .catch(function(err) {
            res.send(err)
        })

})

router.post('/:id/upload', (req, res) => {
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
                        UserId: req.params.id,
                        FileId: data.id,
                        limit: 0,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    })
                })
            console.log(req.file)
                // res.send('test')
            res.redirect('/user')
        }
    })
})

// router.get('/download', (req, res) => {

// })

router.get('/index', (req, res) => {
    res.render('index')
})

router.get('/register', (req, res) => {
    res.render('home')
})

router.post('/register', (req, res) => {
    user.create({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            createdAt: new Date(),
            updatedAt: new Date(),
            email: req.body.email
        })
        .then(function(data) {
            res.redirect('index')
        })
        .catch(function(err) {
            res.send(err)
        })
})

module.exports = router