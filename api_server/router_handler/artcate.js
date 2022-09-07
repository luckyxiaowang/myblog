//导入数据库操作模块
 const db = require('../db/index')

 //获取文章分类的处理函数
 exports.getArticleLists = (req,res)=>{
  // 根据分类的状态，获取所有未被删除的分类列表数据
// is_delete 为 0 表示没有被 标记为删除 的数据
  const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
  db.query(sql, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 2. 执行 SQL 语句成功
    res.send({
      status: 0,
      message: '获取文章分类列表成功！',
      data: results,
    })
  })
}

//增加文章分类的处理函数
exports.addArticleLists = (req,res) =>{
// 定义查询 分类名称 是否被占用的 SQL 语句
const sql = `select * from ev_article_cate where name=? `  
// 执行查重操作
db.query(sql, req.body.name, (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.cc(err)
  // 分别判断 分类名称是否被占用
  if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
 /* 如果分类名称没有被占用,则增加分类名称 */
  const sql = `insert into ev_article_cate set ?`
  db.query(sql, req.body, (err, results) => {
    // SQL 语句执行失败
    if (err) return res.cc(err)
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
    // 新增文章分类成功
    res.cc('新增文章分类成功！', 0)
  })
})

}

//删除文章分类的处理函数
exports.delArticleLists = (req,res)=>{
  //定义根据id删除文章分类的sql语句
  const sql = `update ev_article_cate set is_delete=1 where id=?`
  db.query(sql, req.params.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
    // 删除文章分类成功
    res.cc('删除文章分类成功！', 0)
  })
}

//获取文章分类数据的处理函数
exports.getArticleInfo = (req,res) =>{
  const sql = `select * from ev_article_cate where id=?`
  db.query(sql, req.params.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // SQL 语句执行成功，但是没有查询到任何数据
    if (results.length !== 1) return res.cc('获取文章分类数据失败！')
    // 把数据响应给客户端
    res.send({
      status: 0,
      message: '获取文章分类数据成功！',
      data: results[0],
    })
  })
}

//更新文章分类数据的处理函数
exports.updateArticleInfo = (req,res) =>{
  //查看分类名称是否被占用
  const sql = `select * from ev_article_cate where Id<>? and name=?`
  // 执行查重操作
db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.cc(err)
  // 判断分类名称是否被占用 
  if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
  /* 没有占用之后更新文章分类 */
  const sql = `update ev_article_cate set ? where Id=?`
  db.query(sql, [req.body, req.body.Id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
    // 更新文章分类成功
    res.cc('更新文章分类成功！', 0)
  })
})
}