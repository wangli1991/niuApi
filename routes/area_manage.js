const express = require("express");
const router = express.Router();
const { getAreaManageList } = require("../controller/area_manage");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.post("/getAreaManageList", function (req, res, next) {
  const { usertype, province_id, city_id, ara_id, street_id } = req.body;
  const result = getAreaManageList(
    usertype,
    province_id,
    city_id,
    ara_id,
    street_id
  );
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
