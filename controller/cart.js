/*
 * @Author: WangLi
 * @Date: 2021-04-13 19:21:36
 * @LastEditors: WangLi
 * @LastEditTime: 2021-05-18 06:17:48
 */
const { exec } = require("../db/mysql");
const creatCart = (params) => {
  const { productId, addCount, userId } = params;
  const countSql = `SELECT COUNT(*) as TOTAL FROM tbl_cart WHERE product_id=${productId} AND uid='${userId}'`;
  const productSql = `SELECT * FROM tbl_product where id=${productId}`;
  return exec(countSql).then((countData) => {
    if (countData) {
      const total = countData[0].TOTAL;
      if (total === 0) {
        return exec(productSql).then((productData) => {
          const { id, market_price, sales_price } = productData[0];
          const insertSql = `INSERT INTO tbl_cart (product_id,market_price,sales_price,count,uid) VALUES (${id},${market_price},${sales_price},${addCount},'${userId}')`;
          return exec(insertSql).then((data) => {
            return data ? true : false;
          });
        });
      } else {
        const cartCount = total + addCount;
        console.log(cartCount);
        const updateSql = `UPDATE tbl_cart SET count=count+1 WHERE product_id=${productId} AND uid='${userId}'`;
        console.log(updateSql);
        return exec(updateSql).then((data) => {
          return data ? true : false;
        });
      }
    } else {
      return false;
    }
  });
};
const updateCart = (params) => {
  const { cartId, updateCount, userId } = params;
  const updateSql = `UPDATE tbl_cart SET count=${updateCount} WHERE id=${cartId} AND uid='${userId}'`;
  return exec(updateSql).then((data) => {
    return data ? true : false;
  });
};
const deleteCart = (params) => {
  const { ids, userId } = params;
  const deleteSql = `DELETE FROM tbl_cart WHERE id in (${ids}) AND uid='${userId}'`;
  return exec(deleteSql).then((data) => {
    return data ? true : false;
  });
};
const getCartList = (params) => {
  const { userId } = params;
  const sql = `SELECT a.*,b.name,b.full_reduction_cost,b.full_reduction_count,b.full_reduction_price,b.main_picture,b.activity_type,b.activity_start_time,b.activity_end_time,b.sales_status,b.stock,b.sales_price AS product_sales_price,b.market_price AS product_market_price FROM tbl_cart a INNER JOIN tbl_product b ON (a.product_id = b.id) WHERE uid='${userId}'`;
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
const getCartCount = (params) => {
  const { userId } = params;
  const countSql = `SELECT SUM(count) as TOTAL FROM tbl_cart a INNER JOIN tbl_product b ON (a.product_id = b.id) WHERE b.sales_status=1 and a.uid='${userId}'`;
  return exec(countSql).then((data) => {
    if (data) {
      const total = data[0].TOTAL;
      if (total) {
        return { count: total };
      } else {
        return { count: 0 };
      }
    } else {
      return false;
    }
  });
};
const getProductCartCount = (params) => {
  const { productId, userId } = params;
  const countSql = `SELECT SUM(count) as TOTAL,a.id as cart_id FROM tbl_cart a INNER JOIN tbl_product b ON (a.product_id = b.id) WHERE b.sales_status=1 and a.product_id=${productId} and a.uid='${userId}'`;
  console.log(countSql);
  return exec(countSql).then((data) => {
    if (data) {
      const total = data[0].TOTAL;
      return { cart_id: data[0].cart_id, count: total ? total : 0 };
    } else {
      return false;
    }
  });
};
module.exports = {
  creatCart,
  updateCart,
  deleteCart,
  getCartList,
  getCartCount,
  getProductCartCount,
};
