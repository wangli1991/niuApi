/*
 * @Author: wangli
 * @Date: 2020-06-14 17:40:23
 * @Last Modified by: wangli
 * @Last Modified time: 2020-07-10 18:29:59
 */
const express = require("express");
const router = express.Router();
const { login, getUserInfo } = require("../controller/user_admin");
const loginCheck = require("../middleware/loginCheck");
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, JWT_EXPIRED } = require("../utils/constant");
const jwtAuth = require("../utils/jwt");
const { decodeToken } = require("../utils/utils");
const { SuccessModel, ErrorModel, TokenModel } = require("../model/resModel");
// 对所有路由进行 jwt 认证
router.use(jwtAuth);
router.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.json(new TokenModel("token失效"));
  }
});
// 登录接口
router.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  const result = login(username, password);
  return result.then((data) => {
    if (data.code === 200) {
      req.session.uid = data.data.uid;
      const token = jwt.sign(
        { username: username, uid: data.data.uid },
        PRIVATE_KEY,
        { expiresIn: JWT_EXPIRED }
      );
      res.json(
        new SuccessModel({
          uid: data.data.uid,
          username: data.data.username,
          token: token,
        })
      );
    } else {
      let errorMsg;
      if (data.code === 404) {
        errorMsg = "账户不存在";
      } else {
        errorMsg = "密码错误";
      }
      res.json(new ErrorModel(errorMsg));
    }
  });
});
//获取用户信息
router.get("/getUserInfo", function (req, res, next) {
  const token = decodeToken(req);
  if (token && token.username) {
    const uid = token.uid;
    const result = getUserInfo(uid);
    return result.then((data) => {
      if (data) {
        let resData = data[0];
        delete resData.password;
        delete resData.uid;
        res.json(
          new SuccessModel({
            data: resData,
          })
        );
      } else {
        res.json(new ErrorModel("用户不存在"));
      }
    });
  } else {
    res.json(new ErrorModel("用户信息解析失败"));
  }
});
//校验是否登录
router.get("/loginCheck", function (req, res, next) {
  if (loginCheck(req)) {
    res.json(
      new SuccessModel({
        uid: req.session.uid,
      })
    );
    return;
  }
  res.json(new ErrorModel("未登录"));
});
//退出登录
router.post("/logout", function (req, res, next) {
  req.session.mobile = "";
  req.session.uid = "";
  res.json(new SuccessModel("退出成功"));
});
module.exports = router;
