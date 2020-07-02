const express = require("express");
const router = express.Router();
const {
  getBreastHealthStatusList,
} = require("../controller/breast_health_status");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getBreastHealthStatusList", function (req, res, next) {
  const result = getBreastHealthStatusList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
