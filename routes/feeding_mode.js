const express = require("express");
const router = express.Router();
const { getFeedingModeList } = require("../controller/feeding_mode");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getFeedingModeList", function (req, res, next) {
  const result = getFeedingModeList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
