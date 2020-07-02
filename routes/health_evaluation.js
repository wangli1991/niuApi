const express = require("express");
const router = express.Router();
const { getHealthEvaluationList } = require("../controller/health_evaluation");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getHealthEvaluationList", function (req, res, next) {
  const result = getHealthEvaluationList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
