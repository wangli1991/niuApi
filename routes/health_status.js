const express = require("express");
const router = express.Router();
const { getHealthStatusList } = require("../controller/health_status");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getHealthStatusList", function (req, res, next) {
  const result = getHealthStatusList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
