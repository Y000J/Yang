window.onload = function () {

    // 数据准备-------------------------------------------------------------------------
    // 捐款数据数组
    var dataList = new Array();
    // 序号
    dataList.countId = 1;
    let tbody = document.querySelector('#tbody');
    let selSearchOrg = document.querySelector('#selSearchOrg');
    let selAddOrg = document.querySelector('#selAddOrg');
    // 获取DOM
    function get(dom) {
        return document.querySelector(dom);
    }

    //受捐企业数组
    let epList = [{ "id": "1", "name": "壹基金" },
    { "id": "2", "name": "慈济基金" },
    { "id": "3", "name": "宋庆龄基金" }];
    //新增数据对象的方法---------------------------------------------------------------------
    dataList.add = function (pname, orgId, money, date) {
        let newObj = {
            "id": dataList.countId,
            "pname": pname,
            "orgId": orgId,
            "money": money,
            "date": date
        };
        // 为数组添加新元素
        dataList.push(newObj);
        // 序号+1
        dataList.countId++;
    }
    // 创建对象的方法------------------------------------------------------------------------
    dataList.addObj = function (id, pname, orgId, money, date) {
        let newObj = {
            "id": id,
            "pname": pname,
            "orgId": orgId,
            "money": money,
            "date": date
        };
        return newObj;
    }
    // 将数据添加到数组中-------------------------------------------------------------------
    dataList.add("李连杰", "1", "10000", "2013-01-17");
    dataList.add("成龙", "2", "20000", "2013-01-18")
    dataList.add("徐静蕾", "2", "2220000", "2013-01-17")
    dataList.add("陈光标", "2", "1000", "2013-01-18");
    dataList.add("星爷", "1", "10000", "2013-01-17");
    dataList.add("梁朝伟", "2", "20000", "2013-01-18");
    dataList.add("周润发", "1", "10000", "2013-01-17");
    dataList.add("马云", "3", "2000000", "2013-01-18");
    dataList.add("马云他儿子", "3", "2000000", "2013-01-18");
    dataList.add("甄子丹", "3", "40000", "2013-01-19");
    dataList.add("洪金宝", "3", "140000", "2013-01-19");
    dataList.add("马云他儿子", "3", "2000000", "2013-01-18");
    dataList.add("甄子丹", "3", "40000", "2013-01-19");
    dataList.add("洪金宝", "3", "140000", "2013-01-19");


    // 受捐企业显示--------------------------------------------------------------------------------
    function oId(id) {
        for (let i = 0; i < epList.length; i++) {
            const element = epList[i];
            if (element.id == id) {
                return element.name;
            };
        }
    };
    // 下拉菜单
    // 填装下拉主菜单
    select(selSearchOrg);
    select(selAddOrg);
    // // 根据受捐赠企业数组填装菜单函数-----------------------------------------------------------------------
    function select(dom) {
        epList.forEach(element => {
            let option = document.createElement('option');
            option.value = element.id;
            option.innerHTML = element.name;
            dom.appendChild(option);
        });
    }
    // 分页显示-------------------------------------------------------------------------------------------------
    // 总页数
    let pageCount = 0;
    // 每页容量
    let pageVolume = 5;
    // 当前的页码
    let page = 0;
    // 
    let asd = dataList;
    // 计算总页数------------------------------------------------------------------------
    function comput() {
        // 总页数，向上取整
        pageCount = Math.ceil(asd.length / pageVolume);
        // 渲染总页数
        get('#spanPageCount').innerHTML = pageCount;
    };

    // 根据当前页码返回要渲染的数据---------------------------------------------------------
    function getPageList() {
        // 创建一个新数组存储数据
        let pageList = [];
        // 判断是否超过数组的长度
        let maxPage = pageVolume * page + pageVolume;
        maxPage = maxPage > asd.length ? asd.length : maxPage;
        // 遍历当前页的数据存入数组
        for (let i = pageVolume * page; i < maxPage; i++) {
            pageList.push(asd[i])
        };
        return pageList;
    }

    // 渲染表格数据-------------------------------------------------------------------------
    render(dataList)
    function render(dataObj) {
        // 总页数
        comput(dataObj);
        // 渲染前清空数据
        tbody.innerHTML = ''
        getPageList(dataObj).forEach((element, index) => {
            // 创建行
            let tr = document.createElement('tr');
            tr.innerHTML = `
        <td class="qs">
        <input type="checkbox" >
        </td>
        <td class="qs">${element.id}</td>
        <td class="qs">${element.pname}</td>
        <td>${oId(element.orgId)}</td>
        <td>${element.money}</td>
        <td>${element.date}</td>
        <td>
            <a href="javascript:void(0);" class="revise">修改</a>
            <a href="javascript:void(0);" class="delete">删除</a>
        </td>`;
            tbody.appendChild(tr);
            // 添加 删除 修改绑定事件
            tr.querySelector('.delete').addEventListener('click', current);
            tr.querySelector('.revise').addEventListener('click', revise);
        });
        // 填充当前页
        get('#spanPage').innerHTML = page + 1;
    };
    // 上一页下一页按钮----------------------------------------------------------------------
    get('#btnNext').addEventListener('click', function () {
        // 点击后页码+1
        page++;
        if (page == pageCount) {
            page--;
            alert('已经是最后一页');
        } else {
            render();
        }
        console.log(page);
    });
    get('#btnPre').addEventListener('click', function () {
        // 点击后页码+1
        page--;
        if (page < 0) {
            page = 0;
            alert('已经是最后一页');
        } else {
            render();
        }
        console.log(page);
    });

    // 查询按钮------------------------------------------------------------------------------
    get('#btnSearch').addEventListener('click', btnSearch);
    // 查询按钮函数--------------------------------------------------------------------------
    function btnSearch() {
        page = 0;
        // 获取select的value值
        let sevalue = get('#selSearchOrg').value;
        if (sevalue == -1) {
            asd = dataList;
            render();
        } else {
            // 根据value值查询数据存入数组
            let newObj = dataList.filter(function (ele) {
                return ele.orgId == sevalue;
            });
            console.log(newObj);
            asd = newObj;
            render()
        };
    }
    // 新增按钮-----------------------------------------------------------------------------
    get('#btnAdd').addEventListener('click', btnAdd);
    // 删除按钮函数-----------------------------------------------------------------------------
    get('#btndel').addEventListener('click', btndel);
    // 行删除函数--------------------------------------------------------------------------------
    function del(thisTr) {
        // 遍历数组根据ID删除对应的数据
        for (let i = 0; i < dataList.length; i++) {
            const element = dataList[i];
            if (element.id == thisTr.children[1].innerHTML) {
                dataList.splice(i, 1);
                // 赋值后重新渲染表格页面
                asd = dataList;
                render();
                break;
            };
        }
    };
    // 当前行
    function current() {
        let thisTr = this.parentNode.parentNode;
        del(thisTr)
    }


    // 修改函数-------------------------------------------------------------------------------
    // 存储当前行数据的ID
    let temp;
    function revise() {
        // 当前行
        let thisTr = this.parentNode.parentNode;
        temp = thisTr.children[1].innerHTML;
        thisTr.innerHTML = `
        <td class="qs">
        <input type="checkbox">
        </td>
        <td class="qs" ><input type="text" id="oID" value="${thisTr.children[1].innerHTML}"></td>
        <td class="qs"><input type="text" id="addName" value="${thisTr.children[2].innerHTML}"></td>
        <td>
            <select id="addOrg" class="selO" value="${thisTr.children[3].value}"></select>
        </td>
        <td><input type="text" id="addMoney" value="${thisTr.children[4].innerHTML}"></td>
        <td><input type="text" id="addDate" value="${thisTr.children[5].innerHTML}"></td>
        <td>
            <a href="javascript:void(0);" class="cancel">确定</a>
            <a href="javascript:void(0);" class="define">取消</a>
        </td>`;
        ;
        // 捐赠企业下拉菜单
        select(thisTr.querySelector('#addOrg'));
        thisTr.querySelector('.cancel').addEventListener('click', cencel);
        thisTr.querySelector('.define').addEventListener('click', define);

    };

    // 确定按钮----------------------------------------------------------------------------------------
    function cencel() {
        // 将填入的数据转为对象，存入dataList
        for (let i = 0; i < dataList.length; i++) {
            const element = dataList[i];
            if (element.id == temp) {
                // 替换数组中的元素
                let obj = dataList.addObj(get('#oID').value, get('#addName').value, get('#addOrg').value, get('#addMoney').value, get('#addDate').value)
                dataList.splice(i, 1, obj);
                // 重新渲染表格数据
                asd = dataList;
                render()
                break;
            };
        }

    };
    // 取消按钮-----------------------------------------------------------------------------------------
    function define() {
        // asd = dataList;
        render();
    };

    // 新增按钮函数--------------------------------------------------------------------------------------
    function btnAdd() {
        // 获取文本框数据创建一个对象存入数组
        dataList.add(get('#txtName').value, get('#selAddOrg').value, get('#txtMoney').value, get('#txtDate').value)
        asd = dataList;
        render();
        // 添加完成后清空文本框
        get('#txtDate').value = '';
        get('#txtMoney').value = '';
        get('#selAddOrg').value = '1';
        get('#txtName').value = '';
        alert('添加成功！');
    };


    let allInput = tbody.querySelectorAll('input');

    // 删除按钮函数---------------------------------------------------------------------------------------
    function btndel() {
        allInput = tbody.querySelectorAll('input');
        console.log(allInput);
        // 遍历当tbody所有的input
        allInput.forEach(element => {
            // 筛选勾选的行
            if (element.checked) {
                console.log(element);
                // 遍历数组根据ID删除对应的数据
                let thisTr = element.parentNode.parentNode
                del(thisTr)
            }
        });
        // 全选删除后取消全选按钮勾选
        get('thead input').checked = false;
        // 重新加载页面单选框
        allInput = tbody.querySelectorAll('input');
        oneChecked();
    };
    // 遍历当tbody所有的input
    // 全选按钮
    allchecked()
    function allchecked() {
        get('thead input').addEventListener('change', function () {
            allInput = tbody.querySelectorAll('input');
            // 获取tbody所有的input
            if (get('thead input').checked) {
                for (const ele of allInput) {
                    ele.checked = true;
                }
            } else {
                for (const ele of allInput) {
                    ele.checked = false;
                }
            }
        });
    }
    // 单选按钮
    oneChecked();
    function oneChecked() {
        for (let i = 0; i < allInput.length; i++) {
            let flag = false;
            const element = allInput[i];
            element.addEventListener('change', function () {
                let flag = true;
                for (const ele of allInput) {
                    if (ele.checked == false) {
                        flag = false;
                        break;
                    }
                }
                get('thead input').checked = flag;
            })
        }

    }

}


