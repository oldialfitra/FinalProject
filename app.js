const express = require('express')
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')
const userRouter = require('./routes/user')
var session = require('express-session')

//init app
let app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
let port = 3000

//EJS
app.set('trust proxy', 1) // trust first proxy
var sess = {
    secret: 'keyboard cat'
}
app.use(session(sess))
app.set('view engine', 'ejs')

//public folder
app.use(express.static('./public'))

app.get("/", (req, res) => {
    res.render('homemyshare')
})
app.use('/user', userRouter)

app.get('/getSession', (req, res) => {
    res.send(req.session)
})

app.get('/setSession', (req, res) => {
    req.session.user = { name: 'oldi', id: 1 }
    res.send('create session')
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.send('logout')
})







// app.post('/userRouter', upload.single('avatar'), function(req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
// })

// app.post('/photos/upload', upload.array('photos', 12), function(req, res, next) {
//     // req.files is array of `photos` files
//     // req.body will contain the text fields, if there were any
// })

// var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
// app.post('/cool-profile', cpUpload, function(req, res, next) {
//     // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//     //
//     // e.g.
//     //  req.files['avatar'][0] -> File
//     //  req.files['gallery'] -> Array
//     //
//     // req.body will contain the text fields, if there were any
// })


app.listen(port, function() {
    console.log('Listening on port: ' + port)
})