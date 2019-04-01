const express = require("express");
const app = express();
const helmet = require("helmet");
const nunjucks = require("nunjucks");
const sass = require("node-sass");
const fs = require("fs");

const sixtyDaysInSeconds = 5184000;
app.use(helmet.hsts({maxAge: sixtyDaysInSeconds}));
app.use(helmet.noSniff());
app.use(helmet.frameguard({action:"deny"}));
app.use(helmet.xssFilter());
app.use(helmet.noCache());
app.use(helmet.hidePoweredBy());


let env= new nunjucks.Environment(new nunjucks.FileSystemLoader("views"));

env.express(app);

const port =process.env.PORT || 3000;

app.listen(port, (req, res)=>{
  console.log("Now listening on port "+ port);
});

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

app.get("/", (req, res)=>{
  res.render("home.html", {title: "Home"});
});

app.get("/about", (req, res)=>{
  res.render("about.html", {title: "About"});
});

app.get("/projects", (req, res)=>{
  res.render("projects.html", {title: "Projects"});
});

app.get("/ticTacToe", (req, res)=>{
  res.render("ticTacToe.html", {title: "Tic Tac Toe"});
});

app.get("/localweather", (req, res)=>{
  res.render("localweather.html", {title: "Local Weather API"});
});

app.get("/pomodoro", (req, res)=>{
  res.render("pomodoroClock.html", {title: "Fabulous Pomodoro Clock"});
});

app.get("/simon", (req, res)=>{
  res.render("simon.html", {title: "Simon Game"});
})
