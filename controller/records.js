/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-14 16:39:40
 */
const { exec } = require("../db/mysql");
const getRecordsList = (niu_id, handle_user_id, type_id) => {
  let sql = `select*from tbl_records where handle_user_id=${handle_user_id} and niu_id=${niu_id} order by handle_time desc `;
  if (type_id) {
    sql = `select*from tbl_records where handle_user_id=${handle_user_id} and niu_id=${niu_id} and type_id=${type_id} order by handle_time desc `;
  }
  console.log(sql);
  // 返回promise
  return exec(sql).then((data) => {
    if (data) {
      return data;
    } else {
      return false;
    }
  });
};
module.exports = { getRecordsList };
