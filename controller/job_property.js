/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-13 07:56:17
 */
const { exec } = require("../db/mysql");
const getJobPropertyList = () => {
  let sql = `select*from tbl_job_property order by id asc`;
  // 返回promise
  return exec(sql);
};
module.exports = { getJobPropertyList };
