/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const dotenv = require('dotenv');
dotenv.load();

const sid = process.env.SID;
// const Firebase = require("firebase");
// const myFirebaseRef = new Firebase("https://trashpickup-97bc6.firebaseio.com/enrolled");
// myFirebaseRef.push();
const firebase = require('firebase');
const myFirebaseRef = firebase.initializeApp({
  serviceAccount: "./data/trashpickup-service.json",
  databaseURL: "https://trashpickup-97bc6.firebaseio.com"
});

const db = firebase.database();

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 9000 : process.env.PORT;
const app = express();

app.get('/getEnv',function(req,res){
  if(isDeveloping){
      console.log("In dev mode");
      res.send("development");
  }else{
      console.log("In prod mode");
      res.send("production");
  }
});

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.get('*', function response(req, res) {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
  res.end();
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
