const express = require("express");
const app = express();
const helmet = require("helmet");
const nunjucks = require("nunjucks");
const sass = require("node-sass");
const fs = require("fs");

app.use(helmet.noSniff());
app.use(helmet.frameguard({action:"deny"}));
app.use(helmet.xssFilter());


let env= new nunjucks.Environment(new nunjucks.FileSystemLoader("views"));

env.express(app);

const port =process.env.PORT || 3000;

app.listen(port, (req, res)=>{
   console.log("Now listening on port "+ port);
});

sass.render({
  file: "./scss/main.scss"
}, (err, result)=>{
 if (err){
   console.log("Unable to render scss file. Error :" + err);
   return;
 }
 fs.writeFile('./css/output.css', result.css, (err)=>{
   if (err){
     console.log("Error writing file to disk: " + err);
     return;
   }
 });
});

app.use(express.static('css'));

app.get("/", (req, res)=>{
 res.render("home.html")
});
