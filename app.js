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

const varietyRouter = require("./routes/variety");
const hairColorRouter = require("./routes/hair_color");
const birthCountRouter = require("./routes/birth_count");
const birthStatusRouter = require("./routes/birth_status");
const breastHealthStatusRouter = require("./routes/breast_health_status");
const feedingModeRouter = require("./routes/feeding_mode");
const healthEvaluationRouter = require("./routes/health_evaluation");
const entryAgeRouter = require("./routes/entry_age");
const fattenTimeRouter = require("./routes/fatten_time");
const calfFeedingModeRouter = require("./routes/calf_feeding_mode");
const userPropertyRouter = require("./routes/user_property");
const breedRangeRouter = require("./routes/breed_range");
const memberCountRouter = require("./routes/member_count");
const breedFacilitiesRouter = require("./routes/breed_facilities");
const jobPropertyRouter = require("./routes/job_property");
const healthStatusRouter = require("./routes/health_status");
const technicalLevelRouter = require("./routes/technical_level");
const creditGradeRouter = require("./routes/credit_grade");
const ownerInfoRouter = require("./routes/owner_info");
const technicalGradeRouter = require("./routes/technical_grade");
const educationRouter = require("./routes/education");
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

app.use("/api/variety", varietyRouter);
app.use("/api/hairColor", hairColorRouter);
app.use("/api/birthCount", birthCountRouter);
app.use("/api/birthStatus", birthStatusRouter);
app.use("/api/breastHealthStatus", breastHealthStatusRouter);
app.use("/api/feedingMode", feedingModeRouter);
app.use("/api/healthEvaluation", healthEvaluationRouter);
app.use("/api/entryAge", entryAgeRouter);
app.use("/api/fattenTime", fattenTimeRouter);
app.use("/api/calfFeedingMode", calfFeedingModeRouter);
app.use("/api/userProperty", userPropertyRouter);
app.use("/api/breedRange", breedRangeRouter);
app.use("/api/memberCount", memberCountRouter);
app.use("/api/breedFacilities", breedFacilitiesRouter);
app.use("/api/jobProperty", jobPropertyRouter);
app.use("/api/healthStatus", healthStatusRouter);
app.use("/api/technicalLevel", technicalLevelRouter);
app.use("/api/creditGrade", creditGradeRouter);
app.use("/api/ownerInfo", ownerInfoRouter);
app.use("/api/technicalGrade", technicalGradeRouter);
app.use("/api/education", educationRouter);
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
