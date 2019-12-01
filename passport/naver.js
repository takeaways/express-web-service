const NaverStrategy = require("passport-naver").Strategy;
const { User } = require("../models");

module.exports = passport => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAC,
        clientSecret: process.env.NAS,
        callbackURL: "/auth/naver/callback"
      },
      //kakao[4]
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          const exUser = await User.findOne({
            where: {
              snsId: profile.id,
              provider: "naver"
            }
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json.email,
              nick: profile.displayName
                ? profile.displayName
                : "None Named User",
              snsId: profile.id,
              provider: "naver"
            });
            done(null, newUser);
          }
        } catch (error) {
          console.log("d");
          done(error);
        }
      }
    )
  );
};
