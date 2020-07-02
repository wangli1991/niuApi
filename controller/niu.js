/*
 * @Author: wangli
 * @Date: 2020-05-18 15:29:43
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-21 11:00:07
 */
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
  cow_feeding_mode
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
        cow_feeding_mode) values('${masterid}','${masterName}','${category}','${categoryName}','${archivesno}','${stationno}','${bullno}','${varietyno}','${date}','${parentno}','${semenno}','${matriarchalno}','${variety}','${sex}','${hair_color}','${weight}','${height}','${skew}','${bust}','${vessel_length}','${is_have_horn}','${head_img_path}','${hips_img_path}','${left_img_path}','${right_img_path}','${birth_count}','${birth_status}','${breast_health_status}','${feeding_mode}','${health_evaluation}','${entry_age}','${source}','${source_archivesno}','${fatten_time}','${daily_gain_expect}','${out_weight_expect}','${calf_feeding_mode}','${cow_feeding_mode}')`;
          return exec(insertSql).then((insertData) => {
            if (insertData) {
              if (category == 1) {
                return true;
              } else {
                let niuId = insertData.insertId;
                if (niuId < 10) {
                  niuId = "00" + niuId;
                } else if (niuId < 100) {
                  niuId = "0" + niuId;
                }
                let archivesNo =
                  userNo + dateNo + categoryLetter + niuId + sexLetter;
                let updataSql = `update tbl_niu set archivesno='${archivesNo}' where id=${insertData.insertId}`;
                return exec(updataSql).then((updataData) => {
                  if (updataData) {
                    return updataData;
                  } else {
                    return false;
                  }
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
const niuChange = (id, category, date, weight, health_evaluation) => {
  let sql = `select*from tbl_niu where id = ${id}`;
  let categorySql = `select*from tbl_niu_category where id='${category}'`;
  // 返回promise
  return exec(sql).then((data) => {
    const niuData = data[0];
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
            archivesNoArray[0] + categoryLetter + "M" + archivesNoArray[1];
        } else if (niuData.category == 4) {
          archivesNoArray = oldArchivesNo.split("Z");
          archivesNo =
            archivesNoArray[0] + categoryLetter + "Z" + archivesNoArray[1];
        }
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
          cow_feeding_mode) values('${niuData.masterid}','${niuData.masterName}','${category}','${categoryName}','${archivesNo}','${niuData.stationno}','${niuData.bullno}','${niuData.varietyno}','${date}','${niuData.parentno}','${niuData.semenno}','${niuData.matriarchalno}','${niuData.variety}','${niuData.sex}','${niuData.hair_color}','${weight}','${niuData.height}','${niuData.skew}','${niuData.bust}','${niuData.vessel_length}','${niuData.is_have_horn}','${niuData.head_img_path}','${niuData.hips_img_path}','${niuData.left_img_path}','${niuData.right_img_path}','${niuData.birth_count}','${niuData.birth_status}','${niuData.breast_health_status}','${niuData.feeding_mode}','${health_evaluation}','${niuData.entry_age}','${niuData.source}','${niuData.source_archivesno}','${niuData.fatten_time}','${niuData.daily_gain_expect}','${niuData.out_weight_expect}','${niuData.calf_feeding_mode}','${niuData.cow_feeding_mode}')`;
        return exec(insertSql).then((insertData) => {
          if (insertData) {
            let updataSql = `update tbl_niu set status=1 where id=${id}`;
            return exec(updataSql).then((upData) => {
              if (upData) {
                return insertData;
              } else {
                return false;
              }
            });
          } else {
            return false;
          }
        });
      }
    });
  });
};
const getCategoryList = () => {
  let sql = `select*from tbl_niu_category order by id asc`;
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
  let countSql = `select count(*) from tbl_niu where masterid=${masterid} and category=${category}`;
  let sql = `select*from tbl_niu where masterid=${masterid} and category=${category} and status=0 limit ${startCount},${endCount}`;
  // 返回promise
  return exec(countSql).then((countData) => {
    const count = JSON.parse(JSON.stringify(countData[0]))["count(*)"];
    if (countData) {
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
  return exec(sql).then((niuData) => {});
};
module.exports = {
  niuAdd,
  niuChange,
  getCategoryList,
  getNiuList,
  getNiuDetail,
};
