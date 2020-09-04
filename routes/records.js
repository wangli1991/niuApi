/*
 * @Author: 王利
 * @Date: 2020-08-10 16:49:40
 * @LastEditors: 王利
 * @LastEditTime: 2020-08-28 05:32:04
 */
const express = require("express");
const router = express.Router();
const { getRecordsList } = require("../controller/records");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { formatTime } = require("../utils/utils");

router.post("/getRecordsList", function (req, res, next) {
  const { niu_id, handle_user_id, type_id } = req.body;
  const result = getRecordsList(niu_id, handle_user_id, type_id);
  return result.then((listData) => {
    if (listData) {
      res.json(
        new SuccessModel({
          dataList: listData,
          count: listData.length,
        })
      );
    } else {
      res.json(new ErrorModel("获取信息失败"));
    }
  });
});

module.exports = router;
