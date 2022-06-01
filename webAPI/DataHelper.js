
/**
 * @description 操作内存中的键
 * @param {*} key 要获取的键
 */

function DataHelper(key) {
    this.key = key;

    //添加数据
    this.add = function (data1, data2) {
        // 先获取存储中的
        let arrData = this.get();
        if (arrData != null) {
            //创建对象
            let dataobj = {
                id: arrData.length == 0 ? 1 : arrData[arrData.length - 1].id + 1,
                uname: data1,
                uemail: data2
            }
            // 添加数据
            arrData.push(dataobj);
            // 保存数据
            this.save(arrData);
            return true;
        } else {
            return false

        }

    };

    // 获取数据的方法
    this.get = function () {
        let strData = localStorage.getItem(this.key);
        if (strData != null) {
            // 转换为arr
            let arrData = JSON.parse(strData);
            // 返回数组
            return arrData;
        } else {
            return [];
        }
    };
    // 删除数据
    this.del = function (data) {
        // 获取数据
        let arrData = this.get();
        if (arrData.length != 0) {
            // 遍历数据
            for (let i = 0; i < arrData.length; i++) {
                if (arrData[i].uname == data) {
                    arrData.splice(i, 1)
                    break;
                }
            }
            // 保存数据
            this.save(arrData);
        } else {
            return false;
        }
    }

    // 保存数据
    this.save = function (arrData) {
        // 将数据转换为JSON格式
        arrData = JSON.stringify(arrData)
        // 保存数据
        localStorage.setItem(key, arrData);
    }

}
