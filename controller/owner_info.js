/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-16 14:34:02
 */
const { exec } = require("../db/mysql");
const getOwnerInfoList = () => {
  let sql = `select*from tbl_owner_info order by id asc`;
  // 返回promise
  return exec(sql);
};
module.exports = { getOwnerInfoList };
