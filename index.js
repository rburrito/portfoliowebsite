const express = require("express");
const app = express();
const helmet = require("helmet");

app.use(helmet.noSniff());
app.use(helmet.frameGuard({action:"deny"}));
app.use(helmet.xssFilter());

const port =process.env.PORT || 3000;
app.listen(port, (req, res)=>{
   console.log("Now listening on port "+ port);
});
