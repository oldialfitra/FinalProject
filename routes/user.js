const router = require('express').Router()
const user = require('../models').User
const file = require('../models').File
const sharefile = require('../models').ShareFile
const storage = require('../helper/storage')
const upload = require('../helper/upload')
const encrypt = require('../helper/encrypt')

// router.get('/login', (req, res) => {

// })
router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {
    user.findOne({
            where: {
                username: req.body.username,
            }
        })
        .then(function(data) {
            if (data === null) {
                res.send('Wrong username')
            } else {
                if (encrypt(req.body.password, data.password)) {
                    req.session.user = { id: data.id }
                    res.redirect('/user/list')
                        // req.session.user
                } else {
                    throw 'wrong password'
                }
            }
            // }
        })
        .catch(function(err) {
            res.send(err)
        })
})

router.get('/getSession', (req, res) => {
    res.send(req.session.user.id)
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.send('logout')
})

router.get('/list', (req, res) => {
    sharefile.findAll({
            where: {
                UserId: req.session.user.id
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

router.get('/upload', (req, res) => {
    user.findByPk(req.session.user.id)
        .then(function(data) {
            // res.send(data)
            res.render('index', { output: data })
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
                    updatedAt: new Date(),
                    extension: req.file.filename.split('.')[1]
                })
                .then(function(data) {
                    sharefile.create({
                        UserId: req.session.user.id,
                        FileId: data.id,
                        limit: 0,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    })
                })
            console.log(req.file)
                // res.send('test')
            res.render('list')
        }
    })
})

// router.get('/download', (req, res) => {

// })

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
            res.redirect('login')
        })
        .catch(function(err) {
            res.send(err)
        })
})

router.get('/:id/update', (req, res) => {
    file.findByPk(req.params.id)
        .then(function(data) {
            // res.send(data)
            res.render('update', { output: data })
        })
        .catch(function(err) {
            res.send(err)
        })
})

router.post('/:id/update', (req, res) => {
    file.findByPk(req.params.id)
        .then(function(data) {
            file.update({
                name: req.body.name + data.extension
            }, {
                where: {
                    id: req.params.id
                }
            })
        })

    .then(function() {
            res.redirect('/list')
        })
        .catch(function(err) {
            res.send(err)
        })
})

router.get('/:id/delete', (req, res) => {
    sharefile.destroy({
            where: {
                FileId: req.params.id
            }
        })
        .then(function(data) {
            file.destroy({
                where: {
                    id: req.params.id
                }
            })
        })
        .then(function(data) {
            res.redirect('/list')
        })
        .catch(function(err) {
            res.send(err)
        })
})

router.get('/:id/download', (req, res) => {
    file.findByPk(req.params.id)
        .then(function(data) {
            res.download(data.path)
        })
})

router.get('/:username/search', (req, res) => {
    user.findOne({
            where: {
                username: req.params.username
            }
        })
        .then(function(data) {
            res.render(data)
        })
        .catch(function(err) {
            res.send(err)
        })
})

router.get('/:username/list', (req, res) => {
    user.findOne({
            where: {
                username: req.params.username
            }
        })
        .then(function(data) {
            sharefile.findAll({
                where: {
                    UserId: data.id
                },
                include: {
                    model: file
                }
            })
        })
        .then(function(data) {
            // res.send(data)
            res.render('list', { output: data })
        })
        .catch(function(err) {
            res.send(err)
        })
})

module.exports = router