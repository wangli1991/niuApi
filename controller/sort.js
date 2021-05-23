/*
 * @Author: WangLi
 * @Date: 2021-04-12 13:26:01
 * @LastEditors: WangLi
 * @LastEditTime: 2021-04-12 16:24:47
 */
const { exec } = require("../db/mysql");
const getSortList = () => {
  const sql = `SELECT * FROM tbl_sort`;
  return exec(sql).then((res) => {
    if (res && res.length) {
      return { dataList: res, count: res.length };
    } else {
      return false;
    }
  });
};
module.exports = {
  getSortList,
};
