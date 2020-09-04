/*
 * @Author: 王利
 * @Date: 2020-08-05 10:22:27
 * @LastEditors: 王利
 * @LastEditTime: 2020-08-05 12:44:43
 */
const express = require("express");
const router = express.Router();
const { getActionMenuList } = require("../controller/action_menu");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getActionMenuList", function (req, res, next) {
  const { category } = req.query;
  const result = getActionMenuList(category);
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
