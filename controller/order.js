/*
 * @Author: WangLi
 * @Date: 2021-04-29 08:14:19
 * @LastEditors: WangLi
 * @LastEditTime: 2021-05-21 06:19:27
 */
const { exec } = require("../db/mysql");
const { transformDate, getPayDate } = require("../utils/utils");
const getPlaceList = (params) => {
  const { userId, ids, type } = params;
  let sql;
  if (type === "cart") {
    const idArr = ids.split(",");
    sql = `SELECT a.*,a.id AS cart_id,b.name,b.brand,b.specs,b.unit,b.full_reduction_cost,b.full_reduction_count,b.full_reduction_price,b.main_picture,b.activity_type,b.activity_start_time,b.activity_end_time,b.sales_status,b.stock,b.sales_price AS product_sales_price,b.market_price AS product_market_price FROM tbl_cart a INNER JOIN tbl_product b ON (a.product_id = b.id) WHERE a.id in (${idArr}) AND a.uid='${userId}'`;
  } else {
    sql = `SELECT *,sales_price AS product_sales_price,market_price AS product_market_price,1 AS count FROM tbl_product WHERE id=${ids}`;
  }
  return exec(sql).then((data) => {
    if (data) {
      const resData = data.map((x) => {
        delete x.creat_user;
        return x;
      });
      const count = resData.length;
      if (count) {
        return { dataList: resData, count };
      } else {
        return { dataList: null, count };
      }
    } else {
      return false;
    }
  });
};

const creatOrder = (params) => {
  const no = "dxs" + Date.now();
  const {
    orderUser,
    list,
    location,
    userId,
    payStatus,
    type,
    couponCost,
    discountCost,
  } = params;
  const payEndTime = getPayDate();
  let promiseExec = [];
  let sumCost = 0;
  list.forEach((x) => {
    console.log(x.count * x.sales_price);
    sumCost += x.count * x.sales_price;
  });
  const payCost = sumCost - Number(couponCost) - Number(discountCost);
  const insertSql = `INSERT INTO tbl_order (order_no,uid,receiver,receiver_tel,receive_lat,receive_lon,status,pay_end_time,sum_cost, pay_cost, coupon_cost, discount_cost) VALUES ('${no}','${userId}','${
    orderUser.name
  }','${orderUser.phone}','${location.latitude}','${location.longitude}',${
    payStatus ? 1 : 0
  },'${payEndTime}',${sumCost},${payCost},${couponCost},${discountCost})`;
  return exec(insertSql).then((data) => {
    if (data) {
      list.forEach((x) => {
        const productId = type === "cart" ? x.product_id : x.id;
        const subInsertSql = `INSERT INTO tbl_suborder (parent_id,parent_order_no,uid,product_id,count,market_price,sales_price) VALUES (${data.insertId},'${no}','${userId}',${productId},${x.count},${x.market_price},${x.sales_price})`;
        promiseExec.push(exec(subInsertSql));
      });
      if (type === "cart") {
        const ids = list.map((x) => x.id);
        const deleteSql = `DELETE FROM tbl_cart WHERE id in (${ids}) AND uid='${userId}'`;
        promiseExec.push(exec(deleteSql));
      }
      const result = Promise.all(promiseExec);
      return result.then((res) => {
        if (res) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      return false;
    }
  });
};

const getOrderList = (params) => {
  const { userId, status, currentPage, pageSize } = params;
  const startCount = (currentPage - 1) * pageSize;
  let countSql = `SELECT COUNT(*) as TOTAL FROM tbl_order WHERE uid='${userId}'`;
  let sql = `SELECT * FROM tbl_order WHERE uid='${userId}'`;
  if (status) {
    countSql += `AND status=${status}`;
    sql += `AND status=${status}`;
  }
  sql += ` ORDER BY creat_time DESC LIMIT ${startCount},${pageSize}`;
  let promiseExec = [];
  return exec(countSql).then((countData) => {
    if (countData) {
      const total = countData[0].TOTAL;
      return exec(sql).then((data) => {
        if (data) {
          const resData = data.map((x) => {
            delete x.creat_user;
            return x;
          });
          const count = resData.length;
          if (count) {
            resData.forEach((x) => {
              x.creat_time = transformDate(x.creat_time);
              x.update_time = transformDate(x.update_time);
              x.pay_end_time = transformDate(x.pay_end_time);
              let subSql = `SELECT a.*,b.name,b.brand,b.specs,b.unit,b.full_reduction_cost,b.full_reduction_count,b.full_reduction_price,b.main_picture,b.activity_type,b.activity_start_time,b.activity_end_time,b.sales_status,b.stock,b.sales_price AS product_sales_price,b.market_price AS product_market_price FROM tbl_suborder a INNER JOIN tbl_product b ON (a.product_id = b.id) WHERE parent_id='${x.id}'`;
              promiseExec.push(exec(subSql));
            });
            const result = Promise.all(promiseExec);
            return result.then((subData) => {
              resData.forEach((x, i) => {
                let sumCount = 0;
                subData[i].forEach((y, i) => {
                  y.creat_time = transformDate(y.creat_time);
                  y.update_time = transformDate(y.update_time);
                  sumCount++;
                });
                x.children = subData[i];
                x.count = sumCount;
              });
              return { dataList: resData, count, total };
            });
          } else {
            return { dataList: null, count, total };
          }
        } else {
          return false;
        }
      });
    } else {
      return false;
    }
  });
};

const getOrderInfo = (params) => {
  const { orderId } = params;
  const mainSql = `SELECT * FROM tbl_order  WHERE id=${orderId}`;
  const subSql = `SELECT a.*,FORMAT(SUM(a.count * a.sales_price),2) AS sum_price,b.name,b.full_reduction_cost,b.full_reduction_count,b.full_reduction_price,b.main_picture,b.activity_type,b.activity_start_time,b.activity_end_time,b.sales_status,b.stock,b.sales_price AS product_sales_price,b.market_price AS product_market_price FROM tbl_suborder a INNER JOIN tbl_product b ON (a.product_id = b.id) WHERE parent_id=${orderId} 
  GROUP BY a.id`;
  const result = Promise.all([exec(mainSql), exec(subSql)]);
  return result.then((res) => {
    if (res) {
      let resData = res[0][0];
      resData.children = res[1];
      resData.creat_time = transformDate(resData.creat_time);
      resData.update_time = transformDate(resData.update_time);
      resData.pay_end_time = transformDate(resData.pay_end_time);
      return resData;
    } else {
      return false;
    }
  });
};
module.exports = {
  getPlaceList,
  creatOrder,
  getOrderList,
  getOrderInfo,
};
