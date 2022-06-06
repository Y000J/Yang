// 导入express
const express = require('express');
// 创建web服务器
const app = express()
// 监听客户端get
app.get('/', function (req, res) {
    console.log(req.query, res.params);
    // 响应内容
    res.send('请求成功get789' + req.query)
});
app.post('/', function (req, res) {
    res.send('请求成功')
})
// 启动web服务器
app.listen(80, () => {
    console.log('express server running at http://127.0.0.1');
})
