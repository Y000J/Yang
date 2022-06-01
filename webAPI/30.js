window.onload = function () {

    // 数据准备---------------------------------------
    let thData = ['学号', '姓名', '性别', '年龄', '操作'];
    let tbData = [
        { sID: 1, sName: '妲己', sGender: false, sAge: 30 },
        { sID: 2, sName: '大桥', sGender: false, sAge: 18 },
        { sID: 3, sName: '孙策', sGender: true, sAge: 45 },
        { sID: 4, sName: '百里', sGender: true, sAge: 22 },
        { sID: 5, sName: '后裔', sGender: true, sAge: 16 },
    ];

    let tbody = document.querySelector('tbody');
    let addBtn = document.querySelector('#addBtn');
    let add = document.querySelector('.add');
    let sure = document.querySelector('#sure');
    let cancel = document.querySelector('#cancel');
    //功能实现-----------------------------------------
    // 渲染表格头部
    function maskThead() {
        let thead = document.querySelector('thead');
        // 遍历数据表头
        thData.forEach(element => {
            // 创建tr
            let th = document.createElement('th');
            // 将数据填入th
            th.innerHTML = element;
            // 添加th
            thead.appendChild(th);
        });
    };
    maskThead();
    // 渲染body
    function maskTbody(data) {
        // 遍历数据
        data.forEach(element => {
            maskTr(element)
        });
    }
    maskTbody(tbData);
    // 创建行
    function maskTr(data) {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${data.sID}</td>
            <td>${data.sName}</td>
            <td>${JSON.parse(data.sGender) ? '男' : '女'}</td>
            <td>${data.sAge}</td>
            <td>
                <a href="javascript:void(0);" class="prev" >上移</a>
                <a href="javascript:void(0);" class="next" >下移</a>
                <a href="javascript:void(0);" class="del">删除</a>
            </td>`;
        tbody.appendChild(tr);
        // 绑定上移下移删除点击事件
        tr.querySelector('.prev').addEventListener('click', moveUp);
        tr.querySelector('.next').addEventListener('click', moveDown);
        tr.querySelector('.del').addEventListener('click', del);
    }
    // 按钮功能--------------------------------------------------------

    // 点击显示新增表格
    addBtn.addEventListener('click', function () {
        add.style.display = 'block';
    });

    // 确定按钮
    sure.addEventListener('click', function () {
        addTr();
    })

    // 取消按钮
    cancel.addEventListener('click', function () {
        add.style.display = 'none';
    })


    // 新增数据------------------------------------------------------
    function addTr() {
        let addId = document.querySelector('#addId');
        let addName = document.querySelector('#addName');
        let addAge = document.querySelector('#addAge');
        let addGender = document.querySelector('#addGender');
        // 获取数据存入一个对象
        let newData = {
            sID: addId.value,
            sName: addName.value,
            sGender: addGender.value,
            sAge: addAge.value
        }
        // 调用maskTbody函数渲染数据
        maskTr(newData);
        // 添加完成后清空输入框数据
        addId.value = '';
        addName.value = '';
        addGender.value = 'true';
        addAge.value = '';
    }

    // 上移----------------------------------------------------------
    function moveUp() {
        // 点击的行
        let row = this.parentNode.parentNode;
        // 拿到点击行的前一行
        let prev2 = row.previousElementSibling;
        // 判断前一行是否为第一行
        if (prev2 != null) {
            // insertBefore将当前行插入到指定的行后面
            tbody.insertBefore(row, prev2);
        } else {
            alert('已经是第一行了')
        }
    }
    // 下移----------------------------------------------------------
    function moveDown() {
        let row = this.parentNode.parentNode;
        // 拿到点击的后一行
        let prev2 = row.nextElementSibling;
        // 判断前一行是否为第一行
        if (prev2 != null) {
            // insertAdjacentElement将当前行插入到指定的行后面
            prev2.insertAdjacentElement('afterend', row);
        } else {
            alert('已经是最后一行了')
        }
    }
    // 删除---------------------------------------------------------
    function del() {
        let row = this.parentNode.parentNode;// 点击的行
        // 从tbody中删除点击的行
        tbody.removeChild(row);
    }

}