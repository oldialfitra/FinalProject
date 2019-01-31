const express = require('express')
// const multer = require('multer')
const ejs = require('ejs')
const path = require('path')
const userRouter = require('./routes/user')
    //init app
let app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
let port = 3000

//EJS
app.set('view engine', 'ejs')

//public folder
app.use(express.static('./public'))

app.get("/", (req, res) => {
    res.render('index')
})

app.get('/users/register', (req,res) => {
    res.render('register')
})

app.get('/users/login', (req,res) => {
    res.render('login')
})
// app.use('/user/register', userRouter)

app.listen(port, function() {
    console.log('Listening on port: ' + port)
})