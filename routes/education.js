const express = require("express");
const router = express.Router();
const { getEducationList } = require("../controller/education");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getEducationList", function (req, res, next) {
  const result = getEducationList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
