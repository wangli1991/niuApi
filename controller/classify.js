/*
 * @Author: WangLi
 * @Date: 2021-04-12 13:26:01
 * @LastEditors: WangLi
 * @LastEditTime: 2021-05-18 16:35:17
 */
const { exec } = require("../db/mysql");
const getClassifyList = () => {
  const sql = `SELECT * FROM tbl_classify ORDER BY id DESC`;
  return exec(sql).then((res) => {
    if (res && res.length) {
      return { dataList: res, count: res.length };
    } else {
      return false;
    }
  });
};
module.exports = {
  getClassifyList,
};
