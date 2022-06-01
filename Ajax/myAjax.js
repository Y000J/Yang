// 请求参数处理
function resolveData(data) {
    let arr = [];
    for (const k in data) {
        arr.push(k + '=' + data[k]);
    }
    return arr.join("&");
}

function myAjax(option) {
    let xhr = new XMLHttpRequest();
    // 拼接字符串
    let qs = resolveData(option.data);
    if (option.method.toUpperCase() === 'GET') {
        // 指定请求方式，地址，参数
        xhr.open('GET', option.url + '?' + qs);
        // 发起请求
        xhr.send();
    } else if (option.method.toUpperCase() === 'POST') {
        xhr.open('POST', option.url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urllencoded');
        xhr.send(qs);
    }

    // 监听请求状态事件
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);
            option.success(result)
        }
    }
}
