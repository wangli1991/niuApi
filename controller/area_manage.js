/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-17 07:58:26
 */
const { exec } = require("../db/mysql");
const getAreaManageList = (
  usertype,
  province_id,
  city_id,
  ara_id,
  street_id
) => {
  const userType = usertype - 1;
  let sql = `select*from tbl_users where usertype=${userType} and province_id='${province_id}' and city_id='${city_id}' and ara_id='${ara_id}'`;
  if (usertype > 2) {
    sql += ` and street_id='${street_id}'`;
  }
  if (usertype == 1) {
    sql += ` and is_perfect=1`;
  }
  return exec(sql).then((data) => {
    return data;
  });
};
module.exports = { getAreaManageList };
