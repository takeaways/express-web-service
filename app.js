const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

const { sequelize } = require("./models");
const passportConfig = require("./passport");
const indexRouter = require("./routes/page");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const app = express();
sequelize.sync();
passportConfig(passport);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.set("port", process.env.PORT || 8001);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("cookiesecret"));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "cookiesecret"
  })
);
app.use(flash());

app.use(passport.initialize()); //passport 설정 초기화
//passport.deserialize 실행
app.use(passport.session()); // 로그인시 사용자 정보 세션 저장하기 때문에 express session 보다 아래

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);

app.use((req, res, next) => {
  const error = new Error("Not Fund 404");
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(error.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(`server start at port ${app.get("port")} `);
});
