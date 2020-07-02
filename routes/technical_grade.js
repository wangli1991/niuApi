const express = require("express");
const router = express.Router();
const { getTechnicalGradeList } = require("../controller/technical_grade");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getTechnicalGradeList", function (req, res, next) {
  const result = getTechnicalGradeList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
