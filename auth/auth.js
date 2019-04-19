const passport    = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

module.exports = function (app, db) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        db.collection('chatusers').findOne(
            {id: id},
            (err, doc) => {
                done(null, doc);
            }
        );
    });

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "https://ritalawportfoliowebsite.herokuapp.com/auth/github/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
           console.log("here1");
           db.collection('chatusers').findOneAndUpdate(
             {id:profile.id},
             {$setOnInsert:{
               id:profile.id,
               name: profile.displayName || 'Anonymous',
               photo: profile.photos[0].value || '',
               created_on: new Date(),
               provider: profile.provider || '',
               chat_messages: 0
             }
             },
             {upsert:true,
              returnNewDocument: true}, function(err, user){
                if (err) return err;
                return cb(null, user.value);
              }
           );

        }));

}
