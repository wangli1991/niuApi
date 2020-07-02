/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-12 21:46:13
 */
const { exec } = require("../db/mysql");
const getFeedingModeList = () => {
  let sql = `select*from tbl_feeding_mode order by id asc`;
  // 返回promise
  return exec(sql);
};
module.exports = { getFeedingModeList };
