/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-13 07:47:30
 */
const { exec } = require("../db/mysql");
const getBreedFacilitiesList = () => {
  let sql = `select*from tbl_breed_facilities order by id asc`;
  // 返回promise
  return exec(sql);
};
module.exports = { getBreedFacilitiesList };
