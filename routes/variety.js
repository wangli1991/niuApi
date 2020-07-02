const express = require("express");
const router = express.Router();
const { getVarietyList } = require("../controller/variety");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getVarietyList", function (req, res, next) {
  const result = getVarietyList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
