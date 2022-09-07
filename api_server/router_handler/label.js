//导入数据库
const db = require('../db/index')

//获取文章标签的处理函数
exports.getLabelLists = (req,res)=>{
  //定义SQL语句
  const sql = 'select * from ev_article_label order by id asc'
  db.query(sql,(err,results) => {
    //执行SQL语句失败
    if(err) return res.cc(err)
    //执行SQL语句成功
    res.send({
        status: 0,
        message: '获取文章标签列表成功！',
        data: results,
    })

  })
}

//增加文章标签的处理函数
exports.addArticleLists = (req,res) =>{
  // 定义查询 分类标签 是否被占用的 SQL 语句
  const sql = `select * from ev_article_label where name=? `  
  // 执行查重操作
  db.query(sql, req.body.name, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 分别判断 分类名称是否被占用
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('标签名称被占用，请更换后重试！')
   /* 如果分类名称没有被占用,则增加分类名称 */
    const sql = `insert into ev_article_label set ?`
    db.query(sql, req.body, (err, results) => {
      // SQL 语句执行失败
      if (err) return res.cc(err)
      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('新增文章标签失败！')
      // 新增文章分类成功
      res.cc('新增文章标签成功！', 0)
    })
  })
  
  }
