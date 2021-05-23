/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-07-10 14:48:35
 */
const { exec } = require("../db/mysql");
const request = require("request");
const wxLogin = (code) => {
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=wxa675b69b70b0d0de&secret=1934145a197a2f3b75b32e4adb1ec9c6&js_code=${code}&grant_type=authorization_code`;
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const { openid, session_key } = JSON.parse(body);
        let sql = `select*from tbl_wx_users where openid='${openid}'`;
        return exec(sql).then((usersData) => {
          if (usersData.length > 0) {
            return resolve(body);
          } else {
            let insertSql = `insert into tbl_wx_users (openid,session_key) values('${openid}','${session_key}')`;
            return exec(insertSql).then((insertData) => {
              return resolve(body);
            });
          }
        });
      } else {
        reject(error);
      }
    });
  });
};
const register = (mobile, password, usertype) => {
  let sql = `select*from tbl_users where mobile='${mobile}'`;
  return exec(sql).then((usersData) => {
    if (usersData.length > 0) {
      return false;
    } else {
      const salt = bcrypt.genSaltSync(10); //设置加密等级，如果不设置默认为10，最高为10
      const hashPwd = bcrypt.hashSync(password, salt); //将获取到的密码进行加密，得到密文hash
      let insertSql = `insert into tbl_users (username,mobile, password, usertype) values('${mobile}','${mobile}','${hashPwd}','${usertype}')`;
      return exec(insertSql).then((insertData) => {
        return {
          mobile: mobile,
        };
      });
    }
  });
};
const getUserInfo = (options) => {
  let sql = `select*from tbl_wx_users`;
  return exec(sql).then((usersData) => {
    if (usersData.length > 0) {
      return options;
    } else {
      return false;
    }
  });
};
const setReceiver = async (params) => {
  const { orderUser, location, userId } = params;
  const receiver = await getReceiver(userId);
  let sql;
  if (receiver) {
    sql = `UPDATE tbl_receiver SET name='${orderUser.name}',phone='${orderUser.phone}' WHERE uid='${userId}'`;
  } else {
    sql = `INSERT INTO tbl_receiver (name,phone,uid) VALUES ('${orderUser.name}','${orderUser.phone}','${userId}')`;
  }
  return exec(sql).then((data) => {
    return data ? true : false;
  });
};
const getReceiver = (uid) => {
  const sql = `SELECT * FROM tbl_receiver WHERE uid='${uid}'`;
  return exec(sql).then((data) => {
    if (data.length > 0) {
      const res = data[0];
      delete res.uid;
      return res;
    } else {
      return false;
    }
  });
};
module.exports = { getUserInfo, wxLogin, setReceiver, getReceiver };
