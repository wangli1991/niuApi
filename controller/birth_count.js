/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-14 16:39:40
 */
const { exec } = require("../db/mysql");
const getBirthCountList = () => {
  let sql = `select*from tbl_birth_count order by id asc`;
  // 返回promise
  return exec(sql);
};
module.exports = { getBirthCountList };
