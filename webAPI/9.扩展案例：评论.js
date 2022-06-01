(function () {
    // 获取dom
    let inputText = document.querySelector('#inputText');
    let btn = document.querySelector('button');
    let ul = document.querySelector('ul');
    let a;
    // 创建数据数组
    let dataArr = [];
    render();
    let datahelper = new DataHelper('dataStr');

    // 获取a
    function getA() {
        a = ul.querySelectorAll('a');
    }
    getA();
    // 点击评论按钮
    btn.addEventListener('click', function () {
        if (checkUp()) {
            // 获取文本域的内容
            let text = inputText.value;
            // 存入本地内存
            datahelper.add(text);
            del();
        };

        // 评论完毕后清空输入框文字
        inputText.value = '';

    });
    // 按下回车评论
    document.addEventListener('keydown', function (e) {
        if (e.key == 'Enter') {
            alert(123)
            btn.click();
        }
    });

    // 绑定删除功能
    function del() {
        // 删除按钮
        for (let i = 0; i < a.length; i++) {
            a[i].addEventListener('click', function () {
                // 删除对应的li
                datahelper.del(this.parentNode)
                render();
            })
        }
    };

    // 渲染页面
    function render() {
        if (datahelper.get() != null) {
            // 将字符串转换我JS
            dataArr = datahelper.get();
            // 遍历数组，取出元素渲染到页面上
            ul.innerHTML = '';
            for (const ele of dataArr) {
                // 创建评论的li
                let li = document.createElement('li');
                // 填充li的内容
                li.innerHTML = ele + `<a href="javascript:;">X</a>`;
                // 将li添加到ul中
                ul.appendChild(li);
            }
        }
    }

})();