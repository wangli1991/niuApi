/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-20 06:39:24
 */
const { exec } = require("../db/mysql");
const getVarietyList = () => {
  let sql = `select*from tbl_variety order by id asc`;
  // 返回promise
  return exec(sql);
};
module.exports = { getVarietyList };
