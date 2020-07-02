/*
 * @Author: wangli
 * @Date: 2020-05-18 13:47:45
 * @Last Modified by: wangli
 * @Last Modified time: 2020-05-19 16:36:05
 */
const { exec } = require("../db/mysql");
// 这里where 1 = 1 是一个取巧的操作，这个操作既不会影响我们获取的数据，同时也可以简单了我们后面拼接其他条件，不然的话还需要在判断是否要加where的判断
const getBlogList = () => {
  let sql = `select*from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc`;
  // 返回promise
  return exec(sql);
};
const getBlogDetail = (id) => {
  let sql = `select*from blogs where id='${id}'`;
  // 返回promise
  return exec(sql).then((detailData) => {
    return detailData;
  });
};
const newBlog = (blogData) => {
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const createtime = Date.now();
  let sql = `insert into blogs (title,content,author,createtime) values('${title}','${content}','${author}','${createtime}')`;
  return exec(sql).then((insertData) => {
    return {
      id: insertData.insertId,
    };
  });
};
const delBlog = (blogData) => {
  const id = blogData.id;
  const author = blogData.author;
  let sql = `delete from blogs where id='${id}' and author='${author}'`;
  return exec(sql).then((delData) => {
    if (delData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};
const updateBlog = (blogData) => {
  const id = blogData.id;
  const author = blogData.author;
  const title = blogData.title;
  const content = blogData.content;
  let sql = `update blogs set title='${title}',content='${content}'  where id='${id}' and author='${author}'`;
  return exec(sql).then((updateData) => {
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};
module.exports = { getBlogList, getBlogDetail, newBlog, delBlog, updateBlog };
