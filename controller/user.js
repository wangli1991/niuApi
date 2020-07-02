/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-21 09:31:38
 */
const bcrypt = require("bcryptjs");
const { crpto } = require("../utils/crypto");
const { exec, escape } = require("../db/mysql");

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
const login = (mobile, password) => {
  mobile = escape(mobile);
  let sql = `select*from tbl_users where mobile=${mobile}`;
  return exec(sql).then((usersData) => {
    if (usersData.length > 0) {
      const hashPassword = usersData[0].password; //获取密文
      const flag = bcrypt.compareSync(password, hashPassword);
      if (flag) {
        return {
          code: 200,
          data: usersData[0],
        };
      } else {
        return {
          code: 500,
        };
      }
    } else {
      return {
        code: 404,
      };
    }
  });
};
const userPerfect = (
  uid,
  province_id,
  city_id,
  ara_id,
  street_id,
  owner_address,
  owner_area,
  present_area,
  present_address,
  manage_area,
  manage_address,
  family_area,
  family_address,
  work_area,
  work_address,
  user_property,
  area_manage,
  manage_area_info,
  leader_name,
  breed_range,
  member_count,
  breed_facilities,
  breed_variety,
  technical_level,
  credit_grade,
  contact_tel,
  owner_info,
  education,
  age,
  nation,
  occupation,
  job_property,
  technical_grade,
  health_status,
  id_number
) => {
  let sql = `select*from tbl_users where uid='${uid}'`;
  return exec(sql).then((usersData) => {
    if (usersData.length > 0) {
      let userNo = ara_id,
        userType = usersData[0].usertype;
      if (userType == 4) {
        if (userNo < 10) {
          userNo = "00" + userNo;
        } else if (userNo < 100) {
          userNo = "0" + userNo;
        }
      } else if (userType == 3) {
        if (userNo < 10) {
          userNo = "0" + userNo;
        }
      }
      if (userType > 1) {
        userNo += street_id;
      }
      let userIdNo = usersData[0].uid;
      switch (userType) {
        case 1:
          userNo = "A" + userNo;
          break;
        case 2:
          userNo = "B" + userNo;
          break;
        case 3:
          if (userIdNo < 10) {
            userIdNo = "0" + userIdNo;
          }
          userNo = "C" + userNo + userIdNo;
          break;
        case 4:
          if (userIdNo < 10) {
            userIdNo = "0" + userIdNo;
          } else if (userIdNo < 100) {
            userIdNo = "00" + userIdNo;
          }
          userNo = "D" + userNo + userIdNo;
          break;
      }
      let updataSql = `update tbl_users set userno='${userNo}',province_id='${province_id}',city_id='${city_id}',ara_id='${ara_id}',street_id='${street_id}',owner_area='${owner_area}',owner_address='${owner_address}',present_area='${present_area}',present_address='${present_address}',manage_area='${manage_area}',manage_address='${manage_address}',family_area='${family_area}',family_address='${family_address}',work_area='${work_area}',work_address='${work_address}',user_property='${user_property}',area_manage='${area_manage}',manage_area_info='${manage_area_info}',leader_name='${leader_name}',breed_range='${breed_range}',member_count='${member_count}',breed_facilities='${breed_facilities}',breed_variety='${breed_variety}',technical_level='${technical_level}',credit_grade='${credit_grade}',contact_tel='${contact_tel}',owner_info='${owner_info}',education='${education}',age='${age}',nation='${nation}',occupation='${occupation}',job_property='${job_property}',technical_grade='${technical_grade}',health_status='${health_status}',id_number='${id_number}',is_perfect=1 where uid='${uid}'`;
      return exec(updataSql).then((updataData) => {
        if (updataData) {
          return exec(sql).then((data) => {
            return data;
          });
        } else {
          return false;
        }
      });
    } else {
      return false;
    }
  });
};
const getUserInfo = (uid) => {
  let sql = `select*from tbl_users where uid='${uid}'`;
  return exec(sql).then((usersData) => {
    if (usersData.length > 0) {
      return usersData;
    } else {
      return false;
    }
  });
};
module.exports = { register, login, userPerfect, getUserInfo };
