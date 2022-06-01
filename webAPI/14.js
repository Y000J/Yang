window.onload = function () {

    let uName = document.querySelector('#uName');
    let email = document.querySelector('#email');
    let addBtn = document.querySelector('#addBtn');
    let tbody;
    let del;
    let revise;
    let OK;
    let NO;
    // 本地数据
    let datahelper = new DataHelper('info');
    // 存储本地数据的数组
    let arrData = [];
    // 添加数据后重新加载del revise列表
    function load() {
        tbody = document.querySelector('#list>tbody');
        del = document.querySelectorAll('.del');
        revise = document.querySelectorAll('.revise');
        OK = tbody.querySelector('#OK');
        NO = tbody.querySelector('#NO');
    }

    addDta();
    render();

    // 添加邮箱函数
    function addDta() {
        addBtn.addEventListener('click', function () {
            if (checkUP()) {
                // 将数据存入数组
                datahelper.add(uName.value, email.value);
                uName.value = '';
                email.value = '';
            };
            render();
        });
    }

    // 渲染页面
    function render() {
        load();
        //读取本地存储
        arrData = datahelper.get();
        // 清空页面数据
        tbody.innerHTML = '';
        // 遍历数组取出数据 渲染页面
        for (const ele of arrData) {
            let tr = document.createElement('tr');
            // 给tr添加内容
            tr.innerHTML = `<tr>
                <td>${ele.uname}</td>
                <td>${ele.uemail}</td>
                <td>
                    <a href="javascript:;" class="revise">修改</a>&nbsp;&nbsp;
                    <a href="javascript:;" class="del">删除</a>
                </td>
                </tr>`;
            // 追加行
            tbody.appendChild(tr);
        }
        // 每次重新渲染页面就拉取一次数据
        load();
        // 调用删除功能绑定点击事件
        delData();
        // 调用修改函数绑定点击事件
        reviseData()
    }
    // 回车键添加
    document.addEventListener('keyup', function (e) {
        if (e.key == 'Enter') {
            addBtn.click();
        }
    })

    // 判断是否输入内容
    function checkUP() {
        let temp = uName.value.trim();
        let temp2 = email.value;
        if (temp == '') {
            alert('请输入用户名');
            return false;
        } else if (temp2 == '') {
            alert('请输入用户邮箱');
            return false;
        } else {
            return true;
        }

    };

    // 删除功能
    function delData() {
        for (let i = 0; i < del.length; i++) {
            del[i].addEventListener('click', function () {
                datahelper.del(this.parentNode.previousElementSibling.previousElementSibling.innerHTML)
                render();
            })
        }
    }

    // 修改邮箱功能
    function reviseData() {
        // 加载最新的行数据
        // 循环绑定事件
        for (let i = 0; i < revise.length; i++) {
            let temp;
            revise[i].addEventListener('click', function () {
                // 点击后将  修改和取消  更换为确定  和取消
                this.parentNode.innerHTML = `<a href="javascript:;" id="OK">确认</a>&nbsp;&nbsp;
                <a href="javascript:;" id="NO">取消</a>`
                // 获取邮箱行 
                load();
                let emailTd = OK.parentNode.previousElementSibling;
                // 存储原来的邮箱值
                temp = emailTd.innerHTML;
                emailTd.innerHTML = `<input type="text" value="${emailTd.innerHTML}">`
                //绑定确认和取消的按钮功能
                OK.addEventListener('click', function () {
                    // 替换对应的数组数据
                    arrData[i].uemail=emailTd.children[0].value;
                    datahelper.save(arrData)
                    // 还原按钮
                    this.parentNode.innerHTML = `<a href="javascript:;" class="revise">修改</a>&nbsp;&nbsp;
                    <a href="javascript:;" class="del">删除</a>`;
                    render();
                });
                NO.addEventListener('click', function () {
                    emailTd.innerHTML = temp;
                    // 还原按钮
                    this.parentNode.innerHTML = `<a href="javascript:;" class="revise">修改</a>&nbsp;&nbsp;
                    <a href="javascript:;" class="del">删除</a>`;
                    render();
                });
            })
        }
    }
};