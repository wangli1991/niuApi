/*
 * @Author: WangLi
 * @Date: 2021-04-12 13:25:31
 * @LastEditors: WangLi
 * @LastEditTime: 2021-04-12 14:50:04
 */
const express = require("express");
const router = express.Router();
const { getSortList } = require("../controller/sort");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// 数据字典主表列表
router.post("/list", function (req, res, next) {
  const result = getSortList();
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel(data));
    } else {
      res.json(new ErrorModel("获取排序列表失败！"));
    }
  });
});
module.exports = router;
