/*
 * @Author: 王利
 * @Date: 2020-09-03 16:34:05
 * @LastEditors: 王利
 * @LastEditTime: 2020-09-04 12:03:10
 */
const express = require("express");
const router = express.Router();
const {
  getActionMenuList,
  getAreaManageList,
  getBirthCountList,
  getBirthStatusList,
  getBreastHealthStatusList,
  getBreedFacilitiesList,
  getBreedRangeList,
  getCalfFeedingModeList,
  getCreditGradeList,
  getEducationList,
  getEntryAgeList,
  getFattenTimeList,
  getFeedingModeList,
  getHairColorList,
  getHealthEvaluationList,
  getHealthStatusList,
  getInoculationList,
  getJobPropertyList,
  getMemberCountList,
  getOwnerInfoList,
  getTechnicalGradeList,
  getTechnicalLevelList,
  getOwnerPropertyList,
  getVaccinesList,
  getVarietyList,
  getDiseaseList,
} = require("../controller/base_list");
const { SuccessModel, ErrorModel } = require("../model/resModel");

//牛操作菜单
router.get("/getActionMenuList", function (req, res, next) {
  const { category } = req.query;
  const result = getActionMenuList(category);
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//省市区地址
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

//已繁殖胎次
router.get("/getBirthCountList", function (req, res, next) {
  const result = getBirthCountList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//生产状态
router.get("/getBirthStatusList", function (req, res, next) {
  const result = getBirthStatusList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//乳房健康状态
router.get("/getBreastHealthStatusList", function (req, res, next) {
  const result = getBreastHealthStatusList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//养殖设施
router.get("/getBreedFacilitiesList", function (req, res, next) {
  const result = getBreedFacilitiesList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//养殖规模
router.get("/getBreedRangeList", function (req, res, next) {
  const result = getBreedRangeList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//犊牛饲养方式
router.get("/getCalfFeedingModeList", function (req, res, next) {
  const result = getCalfFeedingModeList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//信誉评级
router.get("/getCreditGradeList", function (req, res, next) {
  const result = getCreditGradeList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//学历
router.get("/getEducationList", function (req, res, next) {
  const result = getEducationList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//入栏月龄
router.get("/getEntryAgeList", function (req, res, next) {
  const result = getEntryAgeList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//育肥时间
router.get("/getFattenTimeList", function (req, res, next) {
  const result = getFattenTimeList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//饲养方式
router.get("/getFeedingModeList", function (req, res, next) {
  const result = getFeedingModeList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//毛色
router.get("/getHairColorList", function (req, res, next) {
  const result = getHairColorList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//健康评估
router.get("/getHealthEvaluationList", function (req, res, next) {
  const result = getHealthEvaluationList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//健康状态
router.get("/getHealthStatusList", function (req, res, next) {
  const result = getHealthStatusList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//接种方式
router.get("/getInoculationList", function (req, res, next) {
  const result = getInoculationList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//就业性质
router.get("/getJobPropertyList", function (req, res, next) {
  const result = getJobPropertyList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//从业人数
router.get("/getMemberCountList", function (req, res, next) {
  const result = getMemberCountList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//技术等级
router.get("/getTechnicalGradeList", function (req, res, next) {
  const result = getTechnicalGradeList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//产权负责人信息
router.get("/getOwnerInfoList", function (req, res, next) {
  const result = getOwnerInfoList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//技术水平
router.get("/getTechnicalLevelList", function (req, res, next) {
  const result = getTechnicalLevelList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//养殖规模
router.get("/getUserPropertyList", function (req, res, next) {
  const result = getUserPropertyList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//产权人性质
router.get("/getOwnerPropertyList", function (req, res, next) {
  const result = getOwnerPropertyList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//疫苗名称
router.get("/getVaccinesList", function (req, res, next) {
  const result = getVaccinesList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//品种
router.get("/getVarietyList", function (req, res, next) {
  const result = getVarietyList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

//疾病类型
router.get("/getDiseaseList", function (req, res, next) {
  const result = getDiseaseList();
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});
module.exports = router;
