/*
 * @Author: WangLi
 * @Date: 2021-04-13 19:21:36
 * @LastEditors: WangLi
 * @LastEditTime: 2021-05-21 15:08:25
 */
const { exec } = require("../db/mysql");

const getListByClassify = (params) => {
  const { classify, sort, currentPage, pageSize } = params;
  const startCount = (currentPage - 1) * pageSize;
  const countSql = `SELECT COUNT(*) as TOTAL FROM tbl_product WHERE classify=${classify}`;
  let sql = `SELECT * FROM tbl_product WHERE classify=${classify}`;
  switch (sort) {
    case 1: //按综合排序
      break;
    case 2: //按销量排序
      break;
    case 3: //按价格排序-正序
      sql += ` ORDER BY sales_price ASC`;
      break;
    case -3: //按价格排序-倒序
      sql += ` ORDER BY sales_price DESC`;
      break;
  }
  sql += ` LIMIT ${startCount},${pageSize}`;
  return exec(countSql).then((countData) => {
    if (countData) {
      const total = countData[0].TOTAL;
      return exec(sql).then((data) => {
        if (data) {
          const count = data.length;
          if (data.length) {
            return { dataList: data, count, total };
          } else {
            return { dataList: null, count };
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

const getListByRecommend = (params) => {
  const { recommend, currentPage, pageSize } = params;
  const startCount = (currentPage - 1) * pageSize;
  const countSql = `SELECT COUNT(*) as TOTAL FROM tbl_product WHERE id IN (SELECT products FROM tbl_recommend WHERE type=${recommend})`;
  const sql = `SELECT * FROM tbl_product WHERE id IN (SELECT products FROM tbl_recommend WHERE type=${recommend}) LIMIT ${startCount},${pageSize}`;
  return exec(countSql).then((countData) => {
    if (countData) {
      const total = countData[0].TOTAL;
      return exec(sql).then((data) => {
        if (data) {
          const count = data.length;
          if (data.length) {
            return { dataList: data, count, total };
          } else {
            return { dataList: null, count };
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

const getProductById = (id) => {
  const sql = `SELECT * FROM tbl_product where id=${id}`;
  return exec(sql).then((res) => {
    if (res && res.length) {
      return res[0];
    } else {
      return false;
    }
  });
};
module.exports = {
  getListByClassify,
  getListByRecommend,
  getProductById,
};
