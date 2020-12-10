/*
 * @Author: wangli
 * @Date: 2020-07-19 16:35:22
 * @LastEditors: 王利
 * @LastEditTime: 2020-12-03 14:16:36
 */
const expressJwt = require("express-jwt");

// jwt 配置信息
const config = {
  PRIVATE_KEY: "admin_niu",
  JWT_EXPIRED: 60 * 60, // token失效时间
  CODE_TOKEN_EXPIRED: -2,
};
//jwt 中间件
const auth = expressJwt({
  secret: config.PRIVATE_KEY,
  algorithms: ["HS256"],
  credentialsRequired: true, // 设置为false就不进行校验了，游客也可以访问
}).unless({
  path: ["/user_admin/login"], // 设置 jwt 认证白名单
});

module.exports = {
  config,
  auth,
};
