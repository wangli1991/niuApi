/*
 * @Author: wangli
 * @Date: 2020-05-19 09:05:36
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-28 16:15:20
 */

const env = process.env.NODE_ENV; // 环境参数
let MYSQL_CONF;
let REDIS_CONF;
// 本地环境
if (env === "dev") {
  // mysql 配置
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "niu",
    port: 3306,
  };
  // redis 配置
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };
}

// 线上环境
if (env === "production") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "niu",
    port: 3306,
  };
  // redis 配置
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
};
