const express = require("express");
const router = express.Router();
const { getUserPropertyList } = require("../controller/user_property");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getUserPropertyList", function (req, res, next) {
  const result = getUserPropertyList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
