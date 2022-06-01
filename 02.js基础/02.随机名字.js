// 创建一个 名字生成器 对象
let nameMaker = {
    // 1.1 获取 一个 随机名字
    getAName: function () {
        // 返回 getRanData 函数生成的 1个 随机名字
        return this.getRanData(1)[0];
    },

    // 1.2 生成一个 正随机数 
    //     参数： seed -> 随机数范围
    getRanIndex: function (seed = 100) {
        return Math.ceil(Math.random() * seed);
    },

    // 2.0 生成 随机的 len个名字(默认50个)
    getRanData: function (len = 50) {
        // 汉字数组
        var oriDataList = [
            '赵', '邹', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
        ];

        // 名字数组
        var nameList = [];
        // 每个名字出现的次数
        var nameCounts = [];

        // 循环生成 50个人的名字
        for (var i = 0; i < len; i++) {
            name = Math.random() > 0.65
                ? makeWord(4, 1) + '·' + makeWord(3, 0) // 普金·莱温斯
                : makeWord(2, 1); // 普金
            // 将 名字  存入  legend 数组 （类目数组）
            nameList.push(name);

            // 将 名字  存入 类目的数据 数组
            nameCounts.push({
                name: name, // 名字
                times: Math.round(Math.random() * 100000) // 随机生成 某个 名字 统计的次数
            });
        }

        // 返回 包含 三个数据的 对象
        // return {
        //     nameList: nameList, // 所有名字数组（类目条信息）
        //     nameCounts: nameCounts, // 所有名字 和 出现次数 数组（饼状图储备数据）
        // };

        return nameList;

        //生成姓名的 方法
        function makeWord(max, min) {
            // 名字长度 随机生成
            var nameLen = Math.ceil(Math.random() * max + min);
            // 姓名汉子数组  ['班','长']
            var name = [];
            for (var i = 0; i < nameLen; i++) {
                name.push(oriDataList[Math.round(Math.random() * oriDataList.length - 1)]);
            }
            return name.join(''); // ['班','长'].join('')  ->  '班长'
        }
    }
};