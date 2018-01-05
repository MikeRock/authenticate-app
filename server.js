import express from 'express'
import morgan from 'morgan'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookiePareser from 'cookie-parser'
import passport from 'passport'
import path from 'path'
import mongoose from 'mongoose'
import User from './server/models/User'
import apiRoutes from './server/routes/api'
import config from './server/config'
import signin from './server/passport/signin-local'
import singup from 'signup-local'
const app = express()
const mongoDB = mongoose.connect(config.mongoDB)
const db = mongoose.connection
db.on('error',() => {
console.log("Couldn't connect to database")    
})
db.once('open',() => {
console.log('Connection with mongoDB established')    
})
app.set('view engine','html')

app.use(express.static(path.resolve(__dirname,'client/public')))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan())
app.use(session(config.sessionConfig))
app.use(passport.initialize())
app.use(passport.session(config.cookieConfig))

signin(passport)
singup(passport)

app.param('username',(req, res, username) => {
User.findById({username: username},(err,username) => {
if(!err) req.username = username     
})
})
app.use('/api',apiRoutes)
app.get('*',(req, res) => {
res.sendFile('./client/index')
})

app.all((err,req,res,next) => {
return res.send(501)    
})



