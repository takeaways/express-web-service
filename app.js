const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const flash = require("flash");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.set("port", process.env.PORT || 8001);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
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

app.listen(app.get("port"), () => {
  console.log(`server start at port ${app.get("port")} `);
});
