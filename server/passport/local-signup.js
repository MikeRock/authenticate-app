import local from 'passport-local'
const LocalStrategy = local.Strategy
import User from './../models/User'
const signup = (passport) => {
passport.serializeUser((user,done) => {
done(null,user._id)
})
passport.deserializeUser((id,done) => {
User.findById(id,(err, user) => {
if(err) done(err)
return done(null,user)        
})    
})
passport.use("signup",new LocalStrategy({
usernameField: 'username',
passwordField: 'password',
session: true,
passReqToCallback
},(req,username,password,done) => {
User.findOne({username:username},(err,user) => {
if(err) return
if(user) done(null,false,{message: "Username already taken"})    
})
let user = new User()
user.username = username
user.password = password
user.save((err) => {
if(err) return done(err,false,{message:'Colud not save user to database'})
user.session.user = user
return done(null,user,{message:'User successfully created!'})        
})
}))
}
export default signup 