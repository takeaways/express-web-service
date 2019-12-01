const express = require("express");
const router = express.Router();

const { Post, User } = require("../models");

const { isLoggedIn, isNotLoggedIn } = require("./middlwares");

router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("profile", {
    title: "My Info - Express Web Service",
    user: null
  });
});

router.get("/join", isNotLoggedIn, (req, res, next) => {
  res.render("join", {
    title: "Join Express Web Service",
    user: req.user,
    joinError: req.flash("Join Error")
  });
});

router.get("/", (req, res, next) => {
  Post.findAll({
    include: {
      model: User,
      attribute: ["id", "nick"]
    }
  })
    .then(posts => {
      res.render("main", {
        title: "Main Express Web Service",
        twits: posts,
        user: req.user,
        loginError: req.flash("Login Error")
      });
    })
    .catch(error => {
      console.error(error);
      next(error);
    });
});

module.exports = router;
