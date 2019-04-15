const passport    = require('passport');

module.exports = (app, db)=>{

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

  let ensureAuthenticated = (req, res)=>{
    if (req.isAuthenticated()){
      return next();
    }
    res.redirect('/chatIndex')
  };

app.route('/auth/github').get(passport.authenticate('github'));

app.route('/auth/github/callback').get(passport.authenticate('github', {failureRedirect:'/chatIndex'}), (req, res)=>{
  res.redirect('/chatIndex');
});

app.route("/chatIndex").get((req, res)=>{
  res.render("chatindex.html", {title: "Socket.IO Chat Room"})
});

app.route("/chatMain").get(ensureAuthenticated, (req, res)=>{
  res.render("chatMain.html", {title: "Socket.IO Chat Room"});
});

app.route("/logout").get((req, res)=>{
  req.logout();
  res.redirect('/chatIndex');
});

app.use((req,res, next)=>{
  res.status(404).render("pageNotFound.html", {title: "Page Not Found"});
});

}
