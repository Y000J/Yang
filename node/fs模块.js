// 导入fs 模块
const fs = require('fs');

// // 调用方法写入
// fs.writeFile('./fs/1.txt', '12312312312', function (err) {
//     if (err) {
//         return console.log("写入失败！" + err.message);
//     }
//     console.log('写入成功');
// })

// 调用方法读取文件
fs.readFile(__dirname+'/fs/成绩单.txt', 'utf8', function (err, dataStr) {
    if (err) {
        return console.log("获取失败！");
    }
    // console.log('读取成功' + dataStr);
    let arr = dataStr.split(' ');
    let newArr = [];
    // 将=替换为：
    arr.forEach(item => {
        newArr.push(item.replace('=', '：'));
    });
    // 转换为字符串 添加换行
    newArr.join('/n/r')
    console.log(newArr.join('\n'));

    fs.writeFile(__dirname + '/fs/成绩-OK.txt', newArr.join('\n\r'), function (err) {
        if (err) {
            return console.log("写入失败！" + err.message);
        }
        console.log('写入成功');
    })
})