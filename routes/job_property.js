const express = require("express");
const router = express.Router();
const { getJobPropertyList } = require("../controller/job_property");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getJobPropertyList", function (req, res, next) {
  const result = getJobPropertyList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
