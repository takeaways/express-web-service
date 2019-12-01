exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    //req.login 상태라면 req.user가 있는 확인해서 true / false를 반환 해준다.
    next();
  else res.status(403).send("로그인이 필요합니다.");
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) next();
  else res.redirect("/");
};
