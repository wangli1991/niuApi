/*
 * @Author: wangli
 * @Date: 2020-06-16 12:39:24
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-19 08:24:46
 */
const express = require("express");
const router = express.Router();
const { userPerfect } = require("../controller/user_perfect");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.post("/userPerfect", function (req, res, next) {
  const { uid } = req.body;
  const result = userPerfect(uid);
  return result.then((upData) => {
    res.json(new SuccessModel(upData));
  });
});

module.exports = router;
