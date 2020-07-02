const express = require("express");
const router = express.Router();
const { getMemberCountList } = require("../controller/member_count");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getMemberCountList", function (req, res, next) {
  const result = getMemberCountList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
