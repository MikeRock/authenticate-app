import local from 'passport-local'
const LocalStrategy = local.Strategy
import User from './../models/User'
const signin = (passport) => {
passport.serializeUser((user,done) => {
done(null,user._id)
})
passport.deserializeUser((id,done) => {
User.findById(id,(err, user) => {
if(err) done(err)
return done(null,user)        
})    
})
passport.use("signin",new LocalStrategy({
usernameField: 'username',
passwordField: 'password',
session: true,
passReqToCallback
},(req,username,password,done) => {
User.findOne({username: username},(err,username) => {
if(err) return done(err,false,{message:'User was not found'})
if(req.session && req.session.user)
done(null,false,{message: 'User is already signed in'})
req.session.user = user
return done(null,user,{message:'User was succesfully signed in'})
})
}))
}
export default signin