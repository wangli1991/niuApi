/*
 * @Author: wangli
 * @Date: 2020-07-02 19:47:14
 * @LastEditors: wangli
 * @LastEditTime: 2020-07-23 06:47:33
 */

/**
 * 时间戳格式化函数
 * @param  {string} format    格式
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间
 * @return {string}           格式化的时间字符串
 */
function formatTime(timestamp, datetype) {
  const date = timestamp ? new Date(timestamp * 1000) : new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  let rDate =
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  if (datetype == "date") {
    rDate = year + "-" + month + "-" + day + " ";
  }
  return rDate;
}
/**
 * 获取当天开始时间戳
 * @param {string} date 开始时间yyyy-mm-dd
 */
function startUnix(date) {
  return new Date(Date.parse(date.replace(/-/g, "/"))).getTime();
}
/**
 * 获取当天结束时间戳
 * @param {string} date 结束时间yyyy-mm-dd
 */
function endUnix(date) {
  return new Date().setTime(
    Date.parse(date.replace(/-/g, "/")) + 24 * 60 * 60 * 1000 - 1000
  );
}
/**
 * token解析函数
 * @param {type}
 * @return: {Boolen}           格式化的时间字符串
 */
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("./constant");
function decodeToken(req) {
  const authorization = req.get("Authorization");
  let token = "";
  if (authorization.indexOf("Bearer") >= 0) {
    token = authorization.replace("Bearer ", "");
  } else {
    token = authorization;
  }
  return jwt.verify(token, PRIVATE_KEY);
}
module.exports = { formatTime, startUnix, endUnix, decodeToken };
