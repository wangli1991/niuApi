/*
 * @Author: wangli
 * @Date: 2020-07-19 16:35:22
 * @LastEditors: 王利
 * @LastEditTime: 2020-09-04 12:52:26
 */
const expressJwt = require("express-jwt");
const { PRIVATE_KEY } = require("./constant");

const jwtAuth = expressJwt({
  secret: PRIVATE_KEY,
  algorithms: ["HS256"],
  credentialsRequired: true, // 设置为false就不进行校验了，游客也可以访问
}).unless({
  path: ["/api/user_admin/login"], // 设置 jwt 认证白名单
});

module.exports = jwtAuth;
