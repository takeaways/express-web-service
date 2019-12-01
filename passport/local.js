const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { User } = require("../models");

module.exports = passport => {
  passport.use(
    new localStrategy(
      {
        usernameField: "email", // form 테그의 name 값을 받아 온다
        passwordField: "password"
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (!exUser)
            return done(null, false, { message: "가입되지 않은 회원입니다." });
          const result = await bcrypt.compare(password, exUser.password);
          if (result) {
            done(null, exUser);
          } else {
            done(null, false, { message: "비밀번호가 일치하지 않습니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};

/*
  urlencoded 미들웨어가 해석한 req.body의 값들을 
  usernameField, passwordField에 연결한다.
  req.body.email, req.body.password


  done(서버에러)
  done(null, 사용자 정보)
  done(null, false, 실패정보)

*/
