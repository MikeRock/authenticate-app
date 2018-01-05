export default {
cookieConfig:{
httpOnly: true,
maxAge:10*60*1000},
sessionConfig: {
name: "sess.cookie",
secret:"secretstring"    
},
mongoDB:'mongodb://localhost/test',
tokenConfig: {secret:'tokensecretstring'}
}