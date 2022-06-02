// 导入http模块
const http = require('http');
// 创建web实例
const server = http.createServer();
// 为服务器绑定request事件
server.on('request', (req, res) => {
    // 有请求就会触发事件，调用事件处理函数
    // req请求对象 
    // res 相应对象  返回中文会出现乱码  需要指定编码格式
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    console.log(req.url);
    console.log(req.method);
    str = '返回中文会出现乱码'
    res.end(str)
});
// 启动服务器
server.listen(80, () => {
    console.log('qi dong http://127.0.0.1');
})