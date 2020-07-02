/*
 * @Author: wangli
 * @Date: 2020-05-19 09:05:33
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-14 22:05:45
 */
const mysql = require("mysql");
const { MYSQL_CONF } = require("../config/db");
//创建数据库连接
const con = mysql.createConnection(MYSQL_CONF);

//开始连接
con.connect();

//执行sql函数
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
  return promise;
}
module.exports = { exec, escape: mysql.escape };
