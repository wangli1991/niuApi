const express = require("express");
const router = express.Router();
const { getBreedRangeList } = require("../controller/breed_range");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getBreedRangeList", function (req, res, next) {
  const result = getBreedRangeList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
