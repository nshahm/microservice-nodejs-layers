var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: [
        __dirname + '/dist/src/app.js'
  ],
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
  progress : true,
  colors : true,
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.(css|sass|html)$/),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
   module : {
        loaders: [
           { test: /\.json$/, loader: "json-loader" }
        ]
    },
    resolve : {
       extensions: ['', '.js', '.webpack.js',],
    },
    
    node: {
     console: true
    },
};