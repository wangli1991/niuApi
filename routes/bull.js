const express = require("express");
const router = express.Router();
const { getBullList } = require("../controller/bull");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getBullList", function (req, res, next) {
  const result = getBullList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
