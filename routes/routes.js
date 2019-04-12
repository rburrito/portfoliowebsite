module.exports = (app)=>{
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
  });

  app.get("/calculator", (req, res)=>{
    res.render("calculator.html", {title: "Calculator"});
  });

  app.get("/wikiviewer", (req, res)=>{
    res.render("wikipediaviewer.html", {title:"Wikipedia Viewer"});
  });


}
