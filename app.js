/*
 * @Author: 王利
 * @Date: 2020-07-02 19:47:13
 * @LastEditors: 王利
 * @LastEditTime: 2020-12-03 14:14:50
 */
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const fileStreamRotator = require("file-stream-rotator");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const router = express.Router();
const { auth } = require("./utils/jwt");
const { ErrorModel } = require("./model/resModel");

// 路由列表
const userRouter = require("./routes/user");
const filesUploadRouter = require("./routes/files_upload");
const sysRouter = require("./routes/sys");

const app = express();

//日志
const logsPath = path.join(__dirname, "logs");
// 判断日志文件夹是否存在 不存在则创建
fs.existsSync(logsPath) || fs.mkdirSync(logsPath);
// 创建日志文件
var accessLogStream = fileStreamRotator.getStream({
  date_format: "YYYYMMDD",
  filename: path.join(logsPath, "%DATE%.log"),
  frequency: "daily",
  verbose: false,
});
// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, "logs/access.log"),
//   { flags: "a" }
// );
morgan.format(
  "logger",
  "[logger] :date[iso] :method :url :status :res[content-length] - :response-time ms"
);
app.use(morgan("logger", { stream: accessLogStream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/temp/", express.static("./temp/"));
// 创建Redis客户端
const redisClient = require("./db/redis");
const sessionStore = new RedisStore({
  client: redisClient,
});
// 设置Express的Session存储中间件
app.use(
  session({
    secret: "wangli",
    store: sessionStore,
    cookie: { maxAge: null },
    resave: false,
    saveUninitialized: false,
  })
);
// 对所有路由进行 jwt 认证
router.use(auth);
//routes handler
app.use("/user", userRouter);
app.use("/files_upload", filesUploadRouter);
app.use("/sys", sysRouter);

// error handler
app.use(function (err, req, res, next) {
  let errStatus;
  console.log(err.name);
  if (err.name === "UnauthorizedError" || err.name === "TokenExpiredError") {
    errStatus = 401;
  } else {
    errStatus = err.status || 500;
  }
  res.status(errStatus).send({ error: errStatus });
});

module.exports = app;
