/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-13 07:59:00
 */
const { exec } = require("../db/mysql");
const getHealthStatusList = () => {
  let sql = `select*from tbl_health_status order by id asc`;
  // 返回promise
  return exec(sql);
};
module.exports = { getHealthStatusList };
