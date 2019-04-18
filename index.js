const express = require("express");
const session = require("express-session");
const app = express();
const mongo = require("mongodb").MongoClient;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const sessionStore = new session.MemoryStore();
const io = require("socket.io")(http);
const passportSocketIO = require("passport.socketio");

const helmet = require("helmet");
const nunjucks = require("nunjucks");
const sass = require("node-sass");
const fs = require("fs");
const routes = require("./routes/routes.js");
const auth = require("./auth/auth.js");

const sixtyDaysInSeconds = 5184000;

app.use(helmet.hsts({ maxAge: sixtyDaysInSeconds }));
app.use(helmet.noSniff());
app.use(helmet.frameguard({action:"deny"}));
app.use(helmet.xssFilter());
app.use(helmet.noCache());
app.use(helmet.hidePoweredBy());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  key: 'express.sid',
  store: sessionStore
}));

let env= new nunjucks.Environment(new nunjucks.FileSystemLoader("views"));
env.express(app);
sass.render({
  file: "./public/scss/main.scss"
}, (err, result)=>{
  if (err){
    console.log("Unable to render scss file. Error :" + err);
    return;
  }
  fs.writeFile('./public/css/output.css', result.css, (err)=>{
    if (err){
      console.log("Error writing file to disk: " + err);
      return;
    }
  });
});
app.use(express.static('public'));


mongo.connect(process.env.DATABASE, { useNewUrlParser: true }, (err, client)=>{
  if (err) console.log("Database error: " + err);
  if (client.db==undefined) console.log("Database undefined");

  http.listen(process.env.PORT || 3000);
  auth(app, client.db('testdirectory'));
  routes(app, client.db('testdirectory'));

  io.use(passportSocketIO.authorize({
    cookieParser: cookieParser,
    key: 'express.sid',
    secret: process.env.SESSION_SECRET,
    store: sessionStore
  }));

  let currentUsers=0;

  io.on('connection', socket=>{
    ++currentUsers;
    io.emit('user', {name: socket.request.user.name, currentUsers, connected:true});

    socket.on('disconnect', ()=>{
      --currentUsers;
      io.emit('user', {name: socket.request.user.name, currentUsers, connected: false});
    })


    socket.on("chat message", (message)=>{
      io.emit('chat message', {name: socket.request.user.name, message: message});
    });

  });


});
