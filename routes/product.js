/*
 * @Author: WangLi
 * @Date: 2021-04-13 19:21:20
 * @LastEditors: WangLi
 * @LastEditTime: 2021-06-03 15:17:27
 */
const express = require("express");
const router = express.Router();
const {
  getListByClassify,
  getProductById,
  getListByRecommend,
  getListBySearch,
  getListByActive,
} = require("../controller/product");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// 获取分类商品数据
router.post("/listByClassify", function (req, res, next) {
  const { classify, sort, currentPage, pageSize } = req.body;
  const result = getListByClassify(req.body);
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel(data));
    } else {
      res.json(new ErrorModel("获取商品数据失败！"));
    }
  });
});

// 获取推荐商品数据
router.post("/listByRecommend", function (req, res, next) {
  const { recommend, currentPage, pageSize } = req.body;
  const result = getListByRecommend(req.body);
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel(data));
    } else {
      res.json(new ErrorModel("获取商品数据失败！"));
    }
  });
});

// 获取商品详情数据
router.post("/productById", function (req, res, next) {
  const { productId } = req.body;
  const result = getProductById(productId);
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel(data));
    } else {
      res.json(new ErrorModel("获取商品详情失败！"));
    }
  });
});

// 获取搜索商品数据
router.post("/listBySearch", function (req, res, next) {
  const { classify, sort, currentPage, pageSize } = req.body;
  const result = getListBySearch(req.body);
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel(data));
    } else {
      res.json(new ErrorModel("获取商品数据失败！"));
    }
  });
});

// 获取搜索商品数据
router.post("/salesList", function (req, res, next) {
  const { currentPage, pageSize } = req.body;
  const result = getListByActive(req.body);
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel(data));
    } else {
      res.json(new ErrorModel("获取商品数据失败！"));
    }
  });
});

module.exports = router;
