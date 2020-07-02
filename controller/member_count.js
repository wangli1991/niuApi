/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-13 07:43:38
 */
const { exec } = require("../db/mysql");
const getMemberCountList = () => {
  let sql = `select*from tbl_member_count order by id asc`;
  // 返回promise
  return exec(sql);
};
module.exports = { getMemberCountList };
