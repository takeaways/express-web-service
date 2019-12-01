const KakaoStrategy = require("passport-kakao").Strategy;

const { User } = require("../models");

//kakao[2]
module.exports = passport => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO,
        callbackURL: "/auth/kakao/callback"
      },
      //kakao[4]
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          const exUser = await User.findOne({
            where: {
              snsId: profile.id,
              provider: "kakao"
            }
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json.kaccount_email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: "kakao"
            });
            done(null, newUser);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

/*
  1) /auth/kakao
  2) 카카오 로그인
  3) /auth/kakao/callback으로 프로필 반환  
*/
