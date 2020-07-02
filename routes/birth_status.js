const express = require("express");
const router = express.Router();
const { getBirthStatusList } = require("../controller/birth_status");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getBirthStatusList", function (req, res, next) {
  const result = getBirthStatusList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
