/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-13 05:58:30
 */
const { exec } = require("../db/mysql");
const getFattenTimeList = () => {
  let sql = `select*from tbl_fatten_time order by id asc`;
  // 返回promise
  return exec(sql);
};
module.exports = { getFattenTimeList };
