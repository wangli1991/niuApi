const { ErrorModel } = require("../model/resModel");
function loginCheck(req, res, next) {
  let flag = false;
  if (req.session.mobile) {
    flag = true;
  }
  return flag;
}
module.exports = loginCheck;
