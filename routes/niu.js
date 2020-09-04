const express = require("express");
const router = express.Router();
const {
  niuAdd,
  niuChange,
  getCategoryList,
  getCategory,
  getNiuList,
  getNiuDetail,
} = require("../controller/niu");
const { SuccessModel, ErrorModel } = require("../model/resModel");
//添加牛
router.post("/niuAdd", function (req, res, next) {
  const {
    masterid,
    category,
    archivesno,
    stationno,
    bullno,
    varietyno,
    date,
    parentno,
    semenno,
    matriarchalno,
    variety,
    sex,
    hair_color,
    weight,
    height,
    skew,
    bust,
    vessel_length,
    is_have_horn,
    head_img_path,
    hips_img_path,
    left_img_path,
    right_img_path,
    birth_count,
    birth_status,
    breast_health_status,
    feeding_mode,
    health_evaluation,
    entry_age,
    source,
    source_archivesno,
    fatten_time,
    daily_gain_expect,
    out_weight_expect,
    calf_feeding_mode,
    cow_feeding_mode,
    poi_address,
    poi_name,
    poi_longitude,
    poi_latitude,
  } = req.body;
  const result = niuAdd(
    masterid,
    category,
    archivesno,
    stationno,
    bullno,
    varietyno,
    date,
    parentno,
    semenno,
    matriarchalno,
    variety,
    sex,
    hair_color,
    weight,
    height,
    skew,
    bust,
    vessel_length,
    is_have_horn,
    head_img_path,
    hips_img_path,
    left_img_path,
    right_img_path,
    birth_count,
    birth_status,
    breast_health_status,
    feeding_mode,
    health_evaluation,
    entry_age,
    source,
    source_archivesno,
    fatten_time,
    daily_gain_expect,
    out_weight_expect,
    calf_feeding_mode,
    cow_feeding_mode,
    poi_address,
    poi_name,
    poi_longitude,
    poi_latitude
  );
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel("添加成功"));
    } else {
      res.json(new ErrorModel("添加失败"));
    }
  });
});
//转品种
router.post("/niuChange", function (req, res, next) {
  const {
    niu_id,
    type,
    type_id,
    type_code,
    name,
    category,
    old_category,
    date,
    weight,
    increase_weight,
    health_evaluation,
    house,
    bullno,
    animal_breeder,
    childbirth_date,
    pregnancy_days,
    vaccines_name,
    inoculation,
    vaccines_dose,
    vaccine_factory,
    vaccine_batch,
    quarantine,
    disease_type,
    concurrent_symptom,
    disease_reason,
    treatment_plan,
    veterinary_name,
    treatment_result,
    description,
    poi_address,
    poi_name,
    poi_longitude,
    poi_latitude,
  } = req.body;
  const result = niuChange(
    niu_id,
    type,
    type_id,
    type_code,
    name,
    category,
    old_category,
    date,
    weight,
    increase_weight,
    health_evaluation,
    house,
    bullno,
    animal_breeder,
    childbirth_date,
    pregnancy_days,
    vaccines_name,
    inoculation,
    vaccines_dose,
    vaccine_factory,
    vaccine_batch,
    quarantine,
    disease_type,
    concurrent_symptom,
    disease_reason,
    treatment_plan,
    veterinary_name,
    treatment_result,
    description,
    poi_address,
    poi_name,
    poi_longitude,
    poi_latitude
  );
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel("操作成功"));
    } else {
      res.json(new ErrorModel("操作失败"));
    }
  });
});
//获取分类
router.get("/getCategoryList", function (req, res, next) {
  const { category } = req.query;
  const result = getCategoryList(category);
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});
//根据分类id获取分类
router.get("/getCategory", function (req, res, next) {
  const { id } = req.query;
  console.log(id);
  const result = getCategory(id);
  return result.then((data) => {
    res.json(new SuccessModel(data));
  });
});
//获取列表
router.post("/getNiuList", function (req, res, next) {
  const { masterid, category, page_size, page_no } = req.body;
  const result = getNiuList(masterid, category, page_size, page_no);
  return result.then((listData) => {
    if (listData) {
      res.json(new SuccessModel(listData));
    } else {
      res.json(new ErrorModel("获取信息失败"));
    }
  });
});
//获取详情
router.post("/getNiuDetail", function (req, res, next) {
  const { id } = req.body;
  const result = getNiuDetail(id);
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel(data));
    } else {
      res.json(new ErrorModel("获取信息失败"));
    }
  });
});
module.exports = router;
