/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-13 06:05:15
 */
const { exec } = require("../db/mysql");
const getCalfFeedingModeList = () => {
  let sql = `select*from tbl_calf_feeding_mode order by id asc`;
  // 返回promise
  return exec(sql);
};
module.exports = { getCalfFeedingModeList };
