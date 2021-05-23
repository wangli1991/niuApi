const jwt = require("jsonwebtoken");
const { config } = require("./jwt");

/*
 * @Author: 王利
 * @Date: 2020-11-02 09:39:38
 * @LastEditors: WangLi
 * @LastEditTime: 2021-04-17 17:34:57
 */
/**
 * 创建token函数
 * @param {type}
 * @return: {String}
 */
function creatToken(payload) {
  const token = jwt.sign(payload, config.PRIVATE_KEY, {
    expiresIn: config.JWT_EXPIRED,
  });
  return token;
}

/**
 * token解析函数
 * @param {type}
 * @return: {Boolen}
 */
function decodeToken(req) {
  const authorization = req.get("Authorization");
  let token = authorization;
  if (authorization.indexOf("Bearer") >= 0) {
    token = authorization.replace("Bearer ", "");
  }
  return jwt.verify(token, config.PRIVATE_KEY);
}
module.exports = {
  creatToken,
  decodeToken,
};
