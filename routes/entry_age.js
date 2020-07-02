const express = require("express");
const router = express.Router();
const { getEntryAgeList } = require("../controller/entry_age");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getEntryAgeList", function (req, res, next) {
  const result = getEntryAgeList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
