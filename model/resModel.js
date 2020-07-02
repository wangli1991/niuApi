/*
 * @Author: wangli
 * @Date: 2020-05-18 13:46:48
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-13 22:20:08
 */
class BaseModel {
  constructor(data, msg) {
    if (typeof data === "string") {
      this.msg = data;
      data = null;
      msg = null;
    }
    if (data) {
      this.data = data;
    }
    if (msg) {
      this.msg = msg;
    }
  }
}
class SuccessModel extends BaseModel {
  constructor(data, msg) {
    super(data, msg);
    this.status = "S";
  }
}
class ErrorModel extends BaseModel {
  constructor(data, msg) {
    super(data, msg);
    this.status = "E";
  }
}
module.exports = {
  SuccessModel,
  ErrorModel,
};
