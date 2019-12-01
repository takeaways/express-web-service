const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();

const { isNotLoggedIn, isLoggedIn } = require("./middlwares");
const { User } = require("../models");

router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      req.flash("joinError", "이미 가입된 사용자입니다.");
      return res.redirect("/join");
    }
    const hash = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      email,
      nick,
      password: hash
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  //req.user   //req.body.email, req.body.password
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash("loginError", info.message);
      return res.redirect("/");
    }
    // passport.serialize실행(1)
    return req.login(user, loginError => {
      // req.login 은 passposrt 에서 추가 해주는 부분입니다.
      // req.user로 접근이 가능합니다.
      if (loginError) {
        console.log(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res, next) => {
  req.logout();
  //logout 시에는 destroy 안해도 됩니다. 다른 세션도 같이 지워지기 때문에
  //req.session.destroy();
  res.redirect("/");
});

//kakao[1]
router.get("/kakao", passport.authenticate("kakao"));
//kakao[3]
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/"
  }),
  (req, res, next) => {
    res.redirect("/");
  }
);

router.get("/naver", passport.authenticate("naver"));

router.get(
  "/naver/callback",
  passport.authenticate("naver", {
    failureRedirect: "/"
  }),
  (req, res, next) => {
    res.redirect("/");
  }
);

module.exports = router;
