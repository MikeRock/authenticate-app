import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
let User = new mongoose.Schema({
username:{type: String, unique:true},
pasword: String,
})
User.pre('save',(next) => {
if(!this.isModified('password')) next()
bcrypt.hash(this.password, 10, (err,enc) => {
if(err) next(err)
this.password = enc
next()    
})})
User.method('verifyPassword',(password, callback) => this.password == password)
bcrypt.compare(password,this.password,(err, match) => {
return callback(err,match)     
})
export default mongoose.model("User",User)