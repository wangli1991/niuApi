/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-21 11:00:07
 */
const { formatTime, startUnix, endUnix } = require("../utils/utils");
const { exec } = require("../db/mysql");
const niuAdd = (
  masterid,
  category,
  archivesno,
  stationno,
  bullno,
  varietyno,
  date,
  parentno,
  semenno,
  matriarchalno,
  variety,
  sex,
  hair_color,
  weight,
  height,
  skew,
  bust,
  vessel_length,
  is_have_horn,
  head_img_path,
  hips_img_path,
  left_img_path,
  right_img_path,
  birth_count,
  birth_status,
  breast_health_status,
  feeding_mode,
  health_evaluation,
  entry_age,
  source,
  source_archivesno,
  fatten_time,
  daily_gain_expect,
  out_weight_expect,
  calf_feeding_mode,
  cow_feeding_mode,
  poi_address,
  poi_name,
  poi_longitude,
  poi_latitude
) => {
  let sql = `select*from tbl_users where uid='${masterid}'`;
  let categorySql = `select*from tbl_niu_category where id='${category}'`;
  return exec(sql).then((usersData) => {
    const userInfo = usersData[0];
    const userNo = userInfo.userno;
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    let month = nowDate.getMonth() + 1;
    const day = nowDate.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    const dateNo = year.toString().substring(2) + month + day;
    let sexLetter = "X";
    if (sex == 0) {
      sexLetter = "Y";
    } else {
      sexLetter = "X";
    }
    const masterName = userInfo.realname;
    if (usersData.length > 0) {
      return exec(categorySql).then((categoryData) => {
        if (categoryData) {
          const categoryName = categoryData[0].name;
          const categoryLetter = categoryData[0].letter;
          let insertSql = `insert into tbl_niu (
        masterid,
        master,
        category,
        category_name,
        archivesno,
        stationno,
        bullno,
        varietyno,
        date,
        parentno,
        semenno,
        matriarchalno,
        variety,
        sex,
        hair_color,
        weight,
        height,
        skew,
        bust,
        vessel_length,
        is_have_horn,
        head_img_path,
        hips_img_path,
        left_img_path,
        right_img_path,
        birth_count,
        birth_status,
        breast_health_status,
        feeding_mode,
        health_evaluation,
        entry_age,
        source,
        source_archivesno,
        fatten_time,
        daily_gain_expect,
        out_weight_expect,
        calf_feeding_mode,
        cow_feeding_mode,
        poi_address,
        poi_name,
        poi_longitude,
        poi_latitude) values('${masterid}','${masterName}','${category}','${categoryName}','${archivesno}','${stationno}','${bullno}','${varietyno}','${date}','${parentno}','${semenno}','${matriarchalno}','${variety}','${sex}','${hair_color}','${weight}','${height}','${skew}','${bust}','${vessel_length}','${is_have_horn}','${head_img_path}','${hips_img_path}','${left_img_path}','${right_img_path}','${birth_count}','${birth_status}','${breast_health_status}','${feeding_mode}','${health_evaluation}','${entry_age}','${source}','${source_archivesno}','${fatten_time}','${daily_gain_expect}','${out_weight_expect}','${calf_feeding_mode}','${cow_feeding_mode}','${poi_address}','${poi_name}','${poi_longitude}','${poi_latitude}')`;
          return exec(insertSql).then((insertData) => {
            if (insertData) {
              if (category == 1) {
                return true;
              } else {
                const currentData = formatTime("", "date");
                const startTimestamp = startUnix(currentData);
                const endTimestamp = endUnix(currentData);
                const countSql = `SELECT COUNT(*) AS count FROM tbl_niu where category=${category} and create_time>${startTimestamp} and update_time>${endTimestamp}`;
                return exec(countSql).then((data) => {
                  const count = data[0].count;
                  let countNum = count;
                  if (countNum < 10) {
                    countNum = "00" + countNum;
                  } else if (countNum < 100) {
                    countNum = "0" + countNum;
                  }
                  let archivesNo =
                    userNo + dateNo + categoryLetter + countNum + sexLetter;
                  let updataSql = `update tbl_niu set archivesno='${archivesNo}' where id=${insertData.insertId}`;
                  return exec(updataSql).then((updataData) => {
                    if (updataData) {
                      const selectSql = `SELECT*FROM tbl_niu where id=${insertData.insertId}`;
                      return exec(selectSql).then((selectData) => {
                        if (selectData) {
                          const niuData = selectData[0];
                          const recordSql = `insert into tbl_records (niu_id,category,old_category,type,type_id,name,handle_user_id,handle_user,poi_address,poi_name,poi_longitude, poi_latitude) values('${niuData.id}',${niuData.category},'${niuData.category}','建档',0,'${niuData.category_name}','${niuData.masterid}','${niuData.master}','${poi_address}','${poi_name}','${poi_longitude}','${poi_latitude}')`;
                          return exec(recordSql).then((recordData) => {
                            if (recordData) {
                              return updataData;
                            } else {
                              return false;
                            }
                          });
                        } else {
                          return false;
                        }
                      });
                    } else {
                      return false;
                    }
                  });
                });
              }
            } else {
              return false;
            }
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
const niuChange = (
  niu_id,
  type,
  type_id,
  type_code,
  name,
  category,
  old_category,
  date,
  weight,
  increase_weight,
  health_evaluation,
  house,
  bullno,
  animal_breeder,
  childbirth_date,
  pregnancy_days,
  vaccines_name,
  inoculation,
  vaccines_dose,
  vaccine_factory,
  vaccine_batch,
  quarantine,
  disease_type,
  concurrent_symptom,
  disease_reason,
  treatment_plan,
  veterinary_name,
  treatment_result,
  description,
  poi_address,
  poi_name,
  poi_longitude,
  poi_latitude
) => {
  let sql = `select*from tbl_niu where id = ${niu_id}`;
  let categorySql = `select*from tbl_niu_category where id='${category}'`;
  // 返回promise
  return exec(sql).then((data) => {
    const niuData = data[0];
    const recordSql = `insert into tbl_records (niu_id,category,old_category,type,type_id,type_code,name,handle_user_id,handle_user,poi_address,poi_name,poi_longitude, poi_latitude,weight,increase_weight,house,bullno,animal_breeder,childbirth_date,pregnancy_days, vaccines_name,inoculation,vaccines_dose,vaccine_factory,vaccine_batch,quarantine, disease_type,concurrent_symptom,disease_reason, treatment_plan,veterinary_name,treatment_result,description,date) values('${niu_id}',${category},'${old_category}','${type}','${type_id}','${type_code}','${name}','${niuData.masterid}','${niuData.master}','${poi_address}','${poi_name}','${poi_longitude}','${poi_latitude}','${weight}','${increase_weight}','${house}','${bullno}','${animal_breeder}','${childbirth_date}','${pregnancy_days}','${vaccines_name}','${inoculation}','${vaccines_dose}','${vaccine_factory}','${vaccine_batch}','${quarantine}','${disease_type}','${concurrent_symptom}','${disease_reason}','${treatment_plan}','${veterinary_name}','${treatment_result}','${description}','${date}')`;
    console.log(recordSql);
    let updateSql;
    return exec(recordSql).then((recordData) => {
      if (recordData) {
        switch (type_code) {
          case "zpz": //转品种
            return exec(categorySql).then((categoryData) => {
              if (categoryData) {
                const categoryName = categoryData[0].name;
                const categoryLetter = categoryData[0].letter;
                const oldArchivesNo = niuData.archivesno;
                let archivesNo = "";
                let archivesNoArray = [];
                if (niuData.category == 2) {
                  archivesNoArray = oldArchivesNo.split("M");
                  archivesNo =
                    archivesNoArray[0] +
                    categoryLetter +
                    "M" +
                    archivesNoArray[1];
                } else if (niuData.category == 4) {
                  archivesNoArray = oldArchivesNo.split("Z");
                  archivesNo =
                    archivesNoArray[0] +
                    categoryLetter +
                    "Z" +
                    archivesNoArray[1];
                }
                updateSql = `update tbl_niu set category=${category},category_name='${name}',archivesno='${archivesNo}',date='${date}',weight='${weight}',health_evaluation='${health_evaluation}' where id = ${niu_id}`;
              }
            });
            break;
          case "fs":
            updateSql = `update tbl_niu set house='${house}' where id = ${niu_id}`;
            break;
          case "pz":
            updateSql = `update tbl_niu set mating_date='${date}',action_show='pz' where id = ${niu_id}`;
            break;
          case "hy":
            updateSql = `update tbl_niu set pregnancy_date='${date}',childbirth_date='${childbirth_date}',action_show='hy' where id = ${niu_id}`;
            break;
          case "lc":
            updateSql = `update tbl_niu set abortion_date='${date}',action_show='lc' where id = ${niu_id}`;
            break;
          case "cd":
            updateSql = `update tbl_niu set calving_date='${date}',action_show='cd' where id = ${niu_id}`;
            break;
        }
        if (
          type_code === "zpz" ||
          type_code === "fs" ||
          type_code === "pz" ||
          type_code === "hy" ||
          type_code === "lc" ||
          type_code === "cd"
        ) {
          return exec(updateSql).then((updateData) => {
            if (updateData) {
              return updateData;
            } else {
              return false;
            }
          });
        } else {
          return recordData;
        }
      } else {
        return false;
      }
    });
  });
};
const getCategoryList = (category) => {
  let sql = `select*from tbl_niu_category`;
  if (category) {
    sql = `select*from tbl_niu_category where id<>${category}`;
  }
  // 返回promise
  return exec(sql);
};
const getCategory = (id) => {
  let sql = `select*from tbl_niu_category where id = ${id}`;
  return exec(sql).then((data) => {
    if (data) {
      return data;
    } else {
      return false;
    }
  });
};
const getNiuList = (masterid, category, page_size, page_no) => {
  const startCount = page_no * page_size;
  const endCount = startCount + page_size;
  let countSql = `select count(*) as count from tbl_niu where masterid=${masterid} and category=${category}`;
  let sql = `select*from tbl_niu where masterid=${masterid} and category=${category} and status=0 limit ${startCount},${endCount}`;
  // 返回promise
  return exec(countSql).then((countData) => {
    if (countData) {
      const count = countData[0].count;
      return exec(sql).then((data) => {
        if (data) {
          return {
            count: count,
            data: data,
          };
        } else {
          return false;
        }
      });
    } else {
      return false;
    }
  });
};
const getNiuDetail = (id, category, date, weight, health_evaluation) => {
  let sql = `select*from tbl_niu where id='${id}'`;
  return exec(sql).then((data) => {
    if (data) {
      return data;
    } else {
      return false;
    }
  });
};
module.exports = {
  niuAdd,
  niuChange,
  getCategoryList,
  getNiuList,
  getNiuDetail,
};
