const local = require("./local"); //Strategy
const kakao = require("./kakao");
const naver = require("./naver");

const { User } = require("../models");

const currentUser = {}; // User 캐싱

module.exports = passport => {
  // user:{id:1, name:"hong", age:22}
  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.id); // 세션에 저장
    //(2) 여기서 세션에 아이디를 저장 했기 때문에
  });
  //메모리에 id 만 저장

  //(3) passport.session 이 실행 되면
  //id를 다시 받는다.
  passport.deserializeUser((id, done) => {
    // 1 -> {id:1, name: ....} 복구
    if (currentUser[id]) {
      done(null, currentUser[id]);
    } else {
      User.findOne({
        where: { id },
        include: [
          {
            model: User,
            attributes: ["id", "nick"],
            as: "Followers"
          },
          {
            model: User,
            attributes: ["id", "nick"],
            as: "Followings"
          }
        ]
      })
        .then(user => {
          currentUser[id] = user;
          done(null, user);
        })
        .catch(err => done(err));
    }
  });

  local(passport);
  kakao(passport);
  naver(passport);
};

/*
Strategy
전략 : 누구를 로그인 시킬 것인가

*/
