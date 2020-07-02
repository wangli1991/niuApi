const express = require("express");
const router = express.Router();
const { getCalfFeedingModeList } = require("../controller/calf_feeding_mode");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getCalfFeedingModeList", function (req, res, next) {
  const result = getCalfFeedingModeList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
