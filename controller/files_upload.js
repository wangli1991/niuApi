/*
 * @Author: wangli
 * @Date: 2020-06-18 12:53:41
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-18 21:14:26
 */
const { exec } = require("../db/mysql");
const imgUpload = (path, name) => {
  let sql = `insert into tbl_img_upload (path,name) values('${path}','${name}')`;
  // 返回promise
  return exec(sql).then((data) => {
    let selectSql = `select*from tbl_img_upload where id='${data.insertId}'`;
    return exec(selectSql).then((resData) => {
      if (resData) {
        return resData;
      } else {
        return false;
      }
    });
  });
};
module.exports = { imgUpload };
