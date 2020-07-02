const express = require("express");
const router = express.Router();
const { getHairColorList } = require("../controller/hair_color");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getHairColorList", function (req, res, next) {
  const result = getHairColorList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
