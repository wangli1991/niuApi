/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-18 20:01:45
 */
const { formatTime } = require("../utils/utils");
const { exec } = require("../db/mysql");

const userPerfect = (uid) => {
  let sql = `select*from tbl_users where uid='${uid}'`;
  return exec(sql).then((usersData) => {
    if (usersData.length > 0) {
      return false;
    } else {
      const nowData = formatTime();
      let updataSql = `update tbl_users set update_time='${nowData}' where uid='${uid}'`;
      return exec(updataSql).then((updataData) => {
        return updataData;
      });
    }
  });
};
module.exports = { userPerfect };
