const express = require("express");
const router = express.Router();
const { getBirthCountList } = require("../controller/birth_count");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getBirthCountList", function (req, res, next) {
  const result = getBirthCountList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
