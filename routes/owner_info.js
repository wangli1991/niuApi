const express = require("express");
const router = express.Router();
const { getOwnerInfoList } = require("../controller/owner_info");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getOwnerInfoList", function (req, res, next) {
  const result = getOwnerInfoList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
