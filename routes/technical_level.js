const express = require("express");
const router = express.Router();
const { getTechnicalLevelList } = require("../controller/technical_level");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getTechnicalLevelList", function (req, res, next) {
  const result = getTechnicalLevelList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
