window.onload = function () {
    // 获取dom
    let inputText = document.querySelector('#inputText');
    let btn = document.querySelector('button');
    let ul = document.querySelector('ul');
    let a;

    //评论数组
    let arr = [];

    render();
    // 添加按钮点击事件
    btnAdd();


    // 点击按钮评论--------------------------------
    function btnAdd() {

        // 绑定点击事件
        btn.addEventListener('click', function () {
            // 获取输入内容
            let text = inputText.value;
            let isOk = checktext(text);
            if (isOk) {
                // 添加li
                addLi(text);
            }
            // 将文本添加到数组中
            arr.push(text);
            // 点击后清空文本
            inputText.value = '';
            setLocal();
        })
    };

    // 点击按钮删除评论--------------------------------
    function btnDel() {
        load();
        for (let i = 0; i < a.length; i++) {
            a[i].addEventListener('click', function () {
                // 删除数组中的数据
                arr.splice(i, 1);
                // 删除后存入本地存储
                setLocal()
                // 根据本地存储渲染页面
                render();
            })

        }
    }
    // 初始化---------------------------------
    function load() {
        a = ul.querySelectorAll('a');
    }
    // 创建添加li
    function addLi(text) {
        // 创建li,添加到ul中
        ul.innerHTML += `<li>${text}<a href="javascript:;" >X</a></li>`;
        btnDel();

    }
    // 文本检测-----------------------------
    function checktext(text) {
        // 去除空格
        text = text.trim();
        if (text.length == '') {
            alert('请输入内容');
            return false;
        } else {
            return true;
        }
    }

    // 渲染页面-----------------------------
    function render() {
        // 清空所有li
        ul.innerHTML = '';
        getLocal();
        // 根据arr数据重新渲染
        for (const ele of arr) {
            addLi(ele);
        }
    }

    // 存入本地内存----------------------------
    function setLocal() {
        localStorage.setItem('strData', JSON.stringify(arr))
    }

    // 从本地存储取出数据-----------------------
    function getLocal() {
        // 
        let temp = localStorage.getItem('strData');

        if (temp != null) {
            arr = JSON.parse(temp);
        }
    }

}