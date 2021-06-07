/*
 * @Author: wangli
 * @Date: 2020-06-18 12:53:41
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-18 21:14:26
 */
const { exec } = require("../db/mysql");
const imgUpload = async (path, name) => {
  const insertSql = `insert into tbl_img_upload (path,name) values('${path}','${name}')`;
  const insertRes = await exec(insertSql);
  if (insertRes) {
    const sql = `select*from tbl_img_upload where id='${insertRes.insertId}'`;
    const res = await exec(sql);
    return res;
  }
  return false;
};
module.exports = { imgUpload };
