const express = require("express");
const router = express.Router();
const { getFattenTimeList } = require("../controller/fatten_time");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getFattenTimeList", function (req, res, next) {
  const result = getFattenTimeList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
