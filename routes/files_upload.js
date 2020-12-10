/*
 * @Author: wangli
 * @Date: 2020-06-18 12:53:27
 * @Last Modified by: wangli
 * @Last Modified time: 2020-06-18 21:14:25
 */
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const path = require("path");
const os = require("os");
const { imgUpload } = require("../controller/files_upload");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.post("/imgUpload", upload.single("file"), function (req, res, next) {
  const file = req.file;
  fs.readFile(file.path, (err, data) => {
    if (err) {
      res.json(new ErrorModel("图片上传失败！"));
      return;
    }
    let fileName = file.originalname;
    let dateName = Date.now() + parseInt(Math.random() * 999);
    let fileDotName = fileName.lastIndexOf(".");
    let fileSubName = fileName.substring(fileDotName, fileDotName.length);
    let imgName = dateName + fileSubName;
    fs.writeFile(
      path.join(__dirname, "../temp/images/" + imgName),
      data,
      (err) => {
        if (err) {
          res.json(new ErrorModel("图片上传失败！"));
          return;
        }

        const networkInterfaces = os.networkInterfaces();
        let saveUrl = "";
        for (var i in networkInterfaces) {
          saveUrl = networkInterfaces[i];
        }
        // const imgPath = `http://${saveUrl[1].address}:8888/temp/images/${imgName}`;
        const imgPath = `/temp/images/${imgName}`;
        const result = imgUpload(imgPath, fileName);
        return result.then((resData) => {
          if (resData) {
            res.json(new SuccessModel(resData));
          } else {
            res.json(new ErrorModel("图片上传失败！"));
          }
        });
      }
    );
  });
});

module.exports = router;
