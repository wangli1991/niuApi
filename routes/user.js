/*
 * @Author: wangli
 * @Date: 2020-06-14 17:40:23
 * @Last Modified by: wangli
 * @Last Modified time: 2020-07-10 18:29:59
 */
const express = require("express");
const router = express.Router();
const { login, getUserInfo } = require("../controller/user");
const { creatToken, decodeToken } = require("../utils/token");
const { SuccessModel, ErrorModel } = require("../model/resModel");
// 登录接口
router.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  const result = login(username, password);
  return result.then((data) => {
    if (data.code === 200) {
      const userInfo = data.data;
      const tokenPayload = { username: username, uid: userInfo.uid };
      const token = creatToken(tokenPayload);
      delete userInfo.password;
      res.json(
        new SuccessModel({
          token: token,
          userInfo: userInfo,
        })
      );
    } else {
      let errorMsg;
      if (data.code === 404) {
        errorMsg = "账户不存在";
      } else {
        errorMsg = "密码错误";
      }
      res.json(new ErrorModel([], errorMsg, data.code));
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
//退出登录
router.post("/logout", function (req, res, next) {
  res.json(new SuccessModel("退出成功"));
});
module.exports = router;
