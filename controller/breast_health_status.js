/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-12 21:45:14
 */
const { exec } = require("../db/mysql");
const getBreastHealthStatusList = () => {
  let sql = `select*from tbl_breast_health_status order by id asc`;
  // 返回promise
  return exec(sql);
};
module.exports = { getBreastHealthStatusList };
