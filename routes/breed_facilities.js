const express = require("express");
const router = express.Router();
const { getBreedFacilitiesList } = require("../controller/breed_facilities");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.get("/getBreedFacilitiesList", function (req, res, next) {
  const result = getBreedFacilitiesList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
