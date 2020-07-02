/*
 * @Author: wangli
 * @Date: 2020-06-14 17:40:23
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-16 19:40:36
 */
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  userPerfect,
  getUserInfo,
} = require("../controller/user");
const loginCheck = require("../middleware/loginCheck");
const { SuccessModel, ErrorModel } = require("../model/resModel");
// 注册接口
router.post("/register", function (req, res, next) {
  const { mobile, password, usertype } = req.body;
  const result = register(mobile, password, usertype);
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel(data));
    } else {
      res.json(new ErrorModel("该手机号已注册"));
    }
  });
});
// 登录接口
router.post("/login", function (req, res, next) {
  const { mobile, password } = req.body;
  const result = login(mobile, password);
  return result.then((data) => {
    if (data.code === 200) {
      req.session.mobile = data.data.mobile;
      req.session.uid = data.data.uid;
      res.json(new SuccessModel(data.data));
    } else {
      let errorMsg;
      if (data.code === 404) {
        errorMsg = "手机号不存在";
      } else {
        errorMsg = "密码错误";
      }
      res.json(new ErrorModel(errorMsg));
    }
  });
});
//完善用户信息
router.post("/userPerfect", function (req, res, next) {
  const {
    uid,
    province_id,
    city_id,
    ara_id,
    street_id,
    owner_address,
    owner_area,
    present_area,
    present_address,
    manage_area,
    manage_address,
    family_area,
    family_address,
    work_area,
    work_address,
    user_property,
    area_manage,
    manage_area_info,
    leader_name,
    breed_range,
    member_count,
    breed_facilities,
    breed_variety,
    technical_level,
    credit_grade,
    contact_tel,
    owner_info,
    education,
    age,
    nation,
    occupation,
    job_property,
    technical_grade,
    health_status,
    id_number,
  } = req.body;
  const result = userPerfect(
    uid,
    province_id,
    city_id,
    ara_id,
    street_id,
    owner_address,
    owner_area,
    present_area,
    present_address,
    manage_area,
    manage_address,
    family_area,
    family_address,
    work_area,
    work_address,
    user_property,
    area_manage,
    manage_area_info,
    leader_name,
    breed_range,
    member_count,
    breed_facilities,
    breed_variety,
    technical_level,
    credit_grade,
    contact_tel,
    owner_info,
    education,
    age,
    nation,
    occupation,
    job_property,
    technical_grade,
    health_status,
    id_number
  );
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel(data));
    } else {
      res.json(new ErrorModel("用户不存在"));
    }
  });
});
//获取用户信息
router.post("/getUserInfo", function (req, res, next) {
  const { uid } = req.body;
  const result = getUserInfo(uid);
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel(data));
    } else {
      res.json(new ErrorModel("用户不存在"));
    }
  });
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
