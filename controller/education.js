/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-13 16:54:03
 */
const { exec } = require("../db/mysql");
const getEducationList = () => {
  let sql = `select*from tbl_education order by id asc`;
  // 返回promise
  return exec(sql);
};
module.exports = { getEducationList };
