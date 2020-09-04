/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-14 16:39:40
 */
const { exec } = require("../db/mysql");
const getActionMenuList = (category) => {
  let sql = `select*from tbl_action_menu where category like '%${category}%'`;
  // 返回promise
  return exec(sql);
};
module.exports = { getActionMenuList };
