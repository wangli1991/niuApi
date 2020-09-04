/*
 * @Author: 王利
 * @Date: 2020-07-02 19:47:13
 * @LastEditors: 王利
 * @LastEditTime: 2020-09-04 12:55:56
 */
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
//基础分类信息列表
const baseListRouter = require("./routes/base_list");

const userRouter = require("./routes/user");
const areaManageRouter = require("./routes/area_manage");
const filesUploadRouter = require("./routes/files_upload");
const bullRouter = require("./routes/bull");
const niuRouter = require("./routes/niu");
const actionMenuRouter = require("./routes/action_menu");
const recordsRouter = require("./routes/records");

// admin users
const userAdminRouter = require("./routes/user_admin");

const app = express();
app.use(logger("dev"));
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

//routes handler app
app.use("/api/baseList", baseListRouter);

app.use("/api/user", userRouter);
app.use("/api/area_manage", areaManageRouter);
app.use("/api/files_upload", filesUploadRouter);
app.use("/api/bull", bullRouter);
app.use("/api/niu", niuRouter);
app.use("/api/actionMenu", actionMenuRouter);
app.use("/api/records", recordsRouter);

//routes handler pc
app.use("/api/user_admin", userAdminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "dev" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
