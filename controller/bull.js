/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-18 22:29:09
 */
const { exec } = require("../db/mysql");
const getBullList = () => {
  let sql = `select*from tbl_bull order by id asc`;
  // 返回promise
  return exec(sql);
};
module.exports = { getBullList };
