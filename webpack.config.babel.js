export default {
entry:{
index: ['index.js']    
},
output: {
filename: 'bundle.js',
path: path.resolve(__dirname,'build'),
publicPath: 'build'
},
module: {
rules:[ {
use: 'babel-loader',
test:/.jsx?$/    
},
{
use: ['style-loader','css-loader'],
test: /.css$/    
}]    }
}