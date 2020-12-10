/*
 * @Author: wangli
 * @Date: 2020-05-18 13:46:48
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-13 22:20:08
 */
class BaseModel {
  constructor(data, msg, code = 200) {
    if (typeof data === "string") {
      this.msg = data;
      return;
    }
    this.msg = null;
    this.data = [];
    if (data) {
      this.data = data;
    }
    if (msg) {
      this.msg = msg;
    }
  }
}
class SuccessModel extends BaseModel {
  constructor(data, msg, code) {
    super(data, msg, code);
    this.status = "S";
    this.ok = true;
    this.code = 200;
  }
}
class ErrorModel extends BaseModel {
  constructor(data, msg, code) {
    super(data, msg, code);
    this.status = "E";
    this.ok = false;
    this.code = code;
  }
}
module.exports = {
  SuccessModel,
  ErrorModel,
};
