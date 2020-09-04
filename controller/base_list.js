/*
 * @Author: 王利
 * @Date: 2020-09-03 16:29:55
 * @LastEditors: 王利
 * @LastEditTime: 2020-09-04 12:02:47
 */
const { exec } = require("../db/mysql");

//牛操作菜单
const getActionMenuList = (category) => {
  let sql = `select*from tbl_action_menu where category like '%${category}%'`;
  return exec(sql);
};

//省市区地址
const getAreaManageList = (
  usertype,
  province_id,
  city_id,
  ara_id,
  street_id
) => {
  const userType = usertype - 1;
  let sql = `select*from tbl_users where usertype=${userType} and province_id='${province_id}' and city_id='${city_id}' and ara_id='${ara_id}'`;
  if (usertype > 2) {
    sql += ` and street_id='${street_id}'`;
  }
  if (usertype == 1) {
    sql += ` and is_perfect=1`;
  }
  return exec(sql).then((data) => {
    return data;
  });
};

//已繁殖胎次
const getBirthCountList = () => {
  let sql = `select*from tbl_birth_count order by id asc`;
  return exec(sql);
};

//生产状态
const getBirthStatusList = () => {
  let sql = `select*from tbl_birth_status order by id asc`;
  return exec(sql);
};

//乳房健康状态
const getBreastHealthStatusList = () => {
  let sql = `select*from tbl_breast_health_status order by id asc`;
  return exec(sql);
};

//养殖设施
const getBreedFacilitiesList = () => {
  let sql = `select*from tbl_breed_facilities order by id asc`;
  return exec(sql);
};

//养殖规模
const getBreedRangeList = () => {
  let sql = `select*from tbl_breed_range order by id asc`;
  // 返回promise
  return exec(sql);
};

//犊牛饲养方式
const getCalfFeedingModeList = () => {
  let sql = `select*from tbl_calf_feeding_mode order by id asc`;
  return exec(sql);
};

//信誉评级
const getCreditGradeList = () => {
  let sql = `select*from tbl_credit_grade order by id asc`;
  return exec(sql);
};

//学历
const getEducationList = () => {
  let sql = `select*from tbl_education order by id asc`;
  return exec(sql);
};

//入栏月龄
const getEntryAgeList = () => {
  let sql = `select*from tbl_entry_age order by id asc`;
  return exec(sql);
};

//育肥时间
const getFattenTimeList = () => {
  let sql = `select*from tbl_fatten_time order by id asc`;
  return exec(sql);
};

//饲养方式
const getFeedingModeList = () => {
  let sql = `select*from tbl_feeding_mode order by id asc`;
  return exec(sql);
};

//毛色
const getHairColorList = () => {
  let sql = `select*from tbl_hair_color order by id asc`;
  return exec(sql);
};

//健康评估
const getHealthEvaluationList = () => {
  let sql = `select*from tbl_health_evaluation order by id asc`;
  return exec(sql);
};

//健康状态
const getHealthStatusList = () => {
  let sql = `select*from tbl_health_status order by id asc`;
  return exec(sql);
};

//接种方式
const getInoculationList = () => {
  let sql = `select*from tbl_inoculation order by id asc`;
  return exec(sql);
};

//就业性质
const getJobPropertyList = () => {
  let sql = `select*from tbl_job_property order by id asc`;
  return exec(sql);
};

//从业人数
const getMemberCountList = () => {
  let sql = `select*from tbl_member_count order by id asc`;
  return exec(sql);
};

//产权负责人信息
const getOwnerInfoList = () => {
  let sql = `select*from tbl_owner_info order by id asc`;
  return exec(sql);
};

//技术等级
const getTechnicalGradeList = () => {
  let sql = `select*from tbl_technical_grade order by id asc`;
  return exec(sql);
};

//技术水平
const getTechnicalLevelList = () => {
  let sql = `select*from tbl_technical_level order by id asc`;
  return exec(sql);
};

//产权人性质
const getOwnerPropertyList = () => {
  let sql = `select*from tbl_owner_property order by id asc`;
  return exec(sql);
};

//疫苗名称
const getVaccinesList = () => {
  let sql = `select*from tbl_vaccines order by id asc`;
  return exec(sql);
};

//品种
const getVarietyList = () => {
  let sql = `select*from tbl_variety order by id asc`;
  return exec(sql);
};

//疾病类型
const getDiseaseList = () => {
  let sql = `select*from tbl_disease order by id asc`;
  return exec(sql);
};
module.exports = {
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
};
