// 一、类 ---------------------------------------------------------
// 1.单位列表类（继承 数组）
class OrgList extends Array {
    // id种子变量
    static idSeed = 1

    // 参数：idSeed-id种子
    constructor(idSeed = 1) {
        super()
        OrgList.idSeed = idSeed
        this.init()
    }

    init() {
        this.addOrg('壹基金')
        this.addOrg('慈济基金')
        this.addOrg('宋庆龄基金')
    }

    // 新增机构
    addOrg(orgName) {
        // 新增对象 到数组
        this.push({ id: OrgList.idSeed, name: orgName })
        // 更新id种子
        OrgList.idSeed++
    }

    // 根据id查找机构对象
    findOrgById(id) {
        let res = this.find(e => e.id === id)
        return res
    }
}

// 2.捐款类 {id,username,orgId,money,date}
class Donation {
    // id,捐款人,机构id,金额,日期
    constructor(id, username, orgId, money, date) {
        this.id = id
        this.username = username
        this.orgId = orgId
        this.money = money
        this.date = date
    }
}

// 3.捐款数组 类 -----------------------------------------
// new Array()   ->  []
class DonationList extends Array {

    // 参数：pageIndex,pageSize
    constructor(pageIndex = 1, pageSize = 5) {
        // 1.数据相关-------------------------
        // 调用父类构造函数
        super()
        // 初始化数据
        this.init()

        // 2.查询结果数组 --------------------
        this.searchOrgId = -1 // 搜索条件 机构id
        this.searchResList = this // 默认就是原数组

        // 3.分页参数 ------------------------
        // 页容量
        this.pageSize = pageSize
        // 页码
        this.pageIndex = pageIndex
        // 总页数
        this.pageCount = 0

        // 计算总页数
        this.countPage()
    }

    // 计算总页数
    countPage() {
        // 总页数
        this.pageCount = Math.ceil(this.searchResList.length / this.pageSize)
    }

    // 初始化数据
    init() {
        this.addDonation("李连杰", 1, 10000)
        this.addDonation("星爷", 1, 10000);
        this.addDonation("甄子丹", 1, 10000);
        this.addDonation("周润发", 1, 10000);
        this.addDonation("成龙", 2, 20000)
        this.addDonation("徐静蕾", 2, 2220000);
        this.addDonation("陈光标", 2, 1000);
        this.addDonation("梁朝伟", 2, 20000);
        this.addDonation("老邹", 2, 20000);
        this.addDonation("马云", 3, 2000000);
        this.addDonation("洪金宝", 3, 2000000);
        this.addDonation("刘德华", 3, 500000);
        this.addDonation("易烊千玺", 3, 2000000);
        this.addDonation("机器猫", 3, 2000000);
        this.addDonation("阿童木", 3, 2000000);
        this.addDonation("黑猫警长", 3, 2000000);
        this.addDonation("闪电训练营", 3, 2000000);
    }

    // 获取指定页 的数据(页码，查询机构id)
    // 返回当前页数据{ 当前页数组 ， 符合搜索条件元素的个数 }
    getPagedList(pageIndex) {
        // 如果传入页码，则设置为当前页码
        if (pageIndex) this.pageIndex = pageIndex
        // 否则，将 当前页码 设置给 形参变量
        else pageIndex = this.pageIndex

        // 获取 新页 首行下标
        let beginI = (pageIndex - 1) * this.pageSize
        // 获取 新页 末行下标
        let endI = pageIndex * this.pageSize - 1;
        // 检查是否 超出最后一个元素下标，如果是，则把数组最后一个下标给它
        // if (this.searchResList.length > 0)
        endI = endI > this.searchResList.length - 1 ? this.searchResList.length - 1 : endI
        // else
        //     endI = endI > this.length - 1 ? this.length - 1 : endI

        // 获取当前页数据：将本页的 首行 到 末行 的 元素，装入新数组
        let pagedList = []
        for (let i = beginI; i <= endI; i++) {
            // 从 符合条件 的 列表中 获取分页数据
            pagedList.push(this.searchResList[i])
        }
        // 返回当前页数据{ 当前页数组 ， 符合搜索条件元素的个数 }
        return pagedList
    }

    // 获取下一页 的数据
    getNextPage() {
        // 检查是否为最后一页
        if (this.pageIndex === this.pageCount) {
            return alert('已经最后一页了哦~~ : )')
        }
        // 页码+1
        this.pageIndex++
        return this.getPagedList(this.pageIndex)
    }

    // 获取上一页 的数据
    getPrevPage() {
        // 检查是否为最后一页
        if (this.pageIndex === 1) {
            return alert('已经第一页了哦~~ : )')
        }
        // 页码+1
        this.pageIndex--
        return this.getPagedList(this.pageIndex)
    }

    // 新增捐款
    addDonation(username, orgId, money, date) {
        // 如果传入日期，则转成日期对象，否则 创建当前日期对象
        date = date ? new Date(date) : new Date()
        date = date.dateFormat("YYYY-mm-dd")
        // 生成 新id
        let newId = this.length > 0 ? this[this.length - 1].id + 1 : 1
        // 创建捐款对象
        let donation = new Donation(newId, username, orgId, money, date)
        // 新增对象 到 源数组
        this.push(donation)
        // 如果 搜索过，且 新捐款的orgid 和 搜索结果数组中一样，则将 数据 同步添加到 搜过结果数组中
        this.searchOrgId > -1 && this.searchResList.some(e => e.orgId == orgId) && this.searchResList.push(donation)
        // 如果 是 init 方法内 新增时，还没有 搜索列表，则先不更新
        // 否则 更新 总页数
        this.searchResList && this.countPage()
    }

    // 搜索（要搜索的 机构id）
    doSearch(orgId) {
        // 标记为搜索过
        this.searchOrgId = orgId
        // 设置 符合搜索条件的 数组
        // this.searchResList = this.filter(d => d.orgId == orgId)
        // 清空 筛选数组
        this.searchResList = []
        // 根据机构筛选
        if (orgId > 0) {
            this.forEach(e => {
                if (e.orgId == orgId) this.searchResList.push(e)
            })
        }
        else { // 如果没选择结构，则将所有数据设置给结果数组
            this.searchResList = this
        }
        // 重新 计算总页数
        this.countPage()
        // 返回搜索后的 第一页数据
        return this.getPagedList(1)
    }

    // 删除捐款
    deleteById(id) {
        id = parseInt(id)

        // a.删除 原始数组元素 --------------------
        // 查找 id相同捐款的 下标
        let index = this.findIndex(e => e.id === id)
        // 如果下标 不为-1，则 根据下标 删除 列表中 的捐款
        index !== -1 && this.splice(index, 1)


        // b.删除 搜索结果数组元素 --------------------
        // 查找 id相同捐款的 下标
        index = this.searchResList.findIndex(e => e.id === id)
        // 如果下标 不为-1，则 根据下标 删除 列表中 的捐款
        index !== -1 && this.searchResList.splice(index, 1)

        // c.更新 总页数
        this.countPage()
    }

    // 根据id查找捐款
    findById(id) {
        let res = this.find(e => e.id === id)
        return res
    }

    // 获取捐给某家机构的所有 捐款
    getListByOrgId(id) {
        return this.filter(e => e.orgId === id)
    }
}

// 4.为 Date 扩展一个 所有对象 共享的 日期格式化方法
// eg: new Date().dateFormat('"YYYY-mm-dd HH:MM"')
Date.prototype.dateFormat = function (fmt) {
    let ret;
    const opt = {
        "Y+": this.getFullYear().toString(),        // 年
        "m+": (this.getMonth() + 1).toString(),     // 月
        "d+": this.getDate().toString(),            // 日
        "H+": this.getHours().toString(),           // 时
        "M+": this.getMinutes().toString(),         // 分
        "S+": this.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

// 5.为 String 扩展一个 所有字符串 共享的 转数字方法
String.prototype.toNumber = function () {
    return Number(this)
}