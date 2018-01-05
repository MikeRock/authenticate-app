import express from 'express'
import passport from 'passport'
const app = express.Router()

app.post('/signup',(req, res, next)=> {
passport.authenticate("singup",(err,user,data) => {
if(err) res.status(401).json({error: err})
res.send({message:"User was signed in"})
res.redirect('/profile')    
})(req, res, next)    
})

app.get('/data',(req, res) => {
if(!req.session.count) req.session.count = 1    
const data = {usernam: 'Mike',count: req.session.count++,}
res.json(data)
})
app.get('/token',(req,res) => {
let token = req.body.token || req.header('authorization').split('')[1] || req.cookies.token
if(token) res.status(200).end()
/* TODO
Set token
*/         
})
app.post('/signin',(req, res) => {
if(!req.username) res.status(401).json({success: false, err:"Username was not provided"})
if(!req.pasword) res.status(401).json({success: false, err:"Password was not provided"})
passport.authenticate('signin',(err,user,data) => {
if(err) res.status(401).json({success: false, err: err})
if(!user) res.status(200).json({success:false, message: data.message})
res.status(200).json({success: true, message: data.message})        
})(req, res, next)        
})
app.post('/logout',(req, res) =>{
req.session.destroy()
res.redirect('/')    
})
export default app