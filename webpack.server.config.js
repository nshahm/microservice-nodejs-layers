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
       // 'webpack/hot/dev-server',
       // 'webpack-hot-middleware/client',
        __dirname + '/src/app.ts'
  ],
  target: 'node',
  devtool: process.env.NODE_ENV === 'dev' ? 'inline-source-map' : '#inline-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.(css|sass|html)$/),
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false })
  ],
   module : {
        preLoaders : [          {
                test: /\.ts$/,
                loader: "tslint-loader"
            }
        ],
        loaders: [
            {
                test: /\.ts?$/,
                loader : 'ts-loader',
                exclude: /node_modules/,
            },
            {
                 test: /\.json$/, loader: 'json-loader' 
            }
        ]
    },
     tslint: {
        configuration: {
            rules: {
                quotemark: [true, "double"]
            }
        },
 
        // tslint errors are displayed by default as warnings 
        // set emitErrors to true to display them as errors 
        emitErrors: false,
 
        // tslint does not interrupt the compilation by default 
        // if you want any file with tslint errors to fail 
        // set failOnHint to true 
        failOnHint: true  
     },
    
    resolve : {
       extensions: ['', '.js', '.webpack.js', '.ts'],
    },
    
    node: {
     console: true
    },
};