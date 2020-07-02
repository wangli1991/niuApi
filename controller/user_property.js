/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-20 06:39:33
 */
const { exec } = require("../db/mysql");
const getUserPropertyList = () => {
  let sql = `select*from tbl_user_property order by id asc`;
  // 返回promise
  return exec(sql);
};
module.exports = { getUserPropertyList };
