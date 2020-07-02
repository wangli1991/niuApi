const express = require("express");
const router = express.Router();
const { getCreditGradeList } = require("../controller/credit_grade");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getCreditGradeList", function (req, res, next) {
  const result = getCreditGradeList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
