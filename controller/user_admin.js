/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-07-10 14:48:35
 */
const bcrypt = require("bcryptjs");
const { exec } = require("../db/mysql");
const jwt = require('jsonwebtoken')
const login = (username, password) => {
  let sql = `select*from tbl_users where username='${username}'`;
  return exec(sql).then((usersData) => {
    if (usersData.length > 0) {
      const hashPassword = usersData[0].password; //获取密文
      const flag = bcrypt.compareSync(password, hashPassword);
      if (flag) {
        return {
          code: 200,
          data: usersData[0],
        };
      } else {
        return {
          code: 500,
        };
      }
    } else {
      return {
        code: 404,
      };
    }
  });
};
const getUserInfo = (uid) => {
  let sql = `select*from tbl_users where uid='${uid}'`;
  return exec(sql).then((usersData) => {
    if (usersData.length > 0) {
      return usersData;
    } else {
      return false;
    }
  });
};
module.exports = { login, getUserInfo };
