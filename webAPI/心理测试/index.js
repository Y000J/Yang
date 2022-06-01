// 准备数据--------------------------------------------------
// 题目列表
let titleList = [];
// 答案列表
let answerList = [];
// 控制题数
let titleNum = 0;
// 总分数
let result = 0;
// 倒计时秒数
let s = 900;
// 返回的答案文字
let optionObj = [
    {
        min: 0,
        max: 25,
        content: '你是一个有点慢熟、不善于表达、不善于交际，在外人面前总是很沉默，给人一种冰冷的感觉，但和你熟悉的人都知道，其实你是一个很好相处的人，对待朋友真诚、热心，很会照顾别人的感受。性格直率坦诚，讨厌那些喜欢说谎、做作的人。个性独立，遇到困难不想去麻烦别人，总是自己咬牙坚持，尽量自己解决。看上去是那种喜静不喜动的人，但内心向往的往往是刺激、有挑战的事物，有自己的理想和追求，并会为了自己的梦想去不懈奋斗。'
    },
    {
        min: 26,
        max: 32,
        content: '你是个乐观积极的人，个性开朗外向，喜欢交朋友，爱去热闹的地方，你总能在聚会中将气氛带动起来。不会杞人忧天的去担心那些还没发生的事，每天保持着积极的心态。对每个人都很热情，你会为了帮别人的忙去面面俱到。偶尔会有点冲动，很可能一腔热血却把事情搞砸，所以遇事一定要多加思考，为自身多考虑'
    },
    {
        min: 33,
        max: 40,
        content: '你是个性格直率的人，最擅长的就是与人交往，朋友很多，做事简洁明了，不拖泥带水，遇到问题也能快速发现问题的所在，并快速找到解决的办法。不管是在什么场合，你都能游刃有余，展现出你的稳重大方。你的乐观开朗，在他人看来总是那么的无忧无虑，好像没有什么问题都可以难倒你，但其实你的内心是比较脆弱的，只是你习惯了什么事都一个人扛。'
    },
    {
        min: 41,
        max: 50,
        content: '你是个谨慎的人，做事面面俱到，对待身边的朋友非常热情，也很有耐心，是一个很合格的倾听者，但是内心非常脆弱。总是无法用语言表达自己的内心，总把自己的真实想法藏在心里。因为长期的安全感的缺失，总是害怕会和别人产生冲突，从而变得沉默。人不仅要会做一个倾听者，也要发泄自己内心的不愉快，始终压抑自己的想法，内心也会越来越孤单、学会的释放自己的压力，有时候能让自己更开朗。'
    }
]
// 
// 动态添加题目的方法   为titleList添加一个方法----------------------------------------
titleList.addTitle = function (id, title, answer, optA, optB, optC, optD) {
    let titleObj = {
        id: id,
        title: title,
        answer: answer,
        option: [optA, optB, optC, optD]
    };
    // 讲题目对象添加到题目数组
    this.push(titleObj);
}
// 为titleList添加数据-----------------------------------------------------------------
titleList.addTitle(1, '你觉得自己是个比较懒吗？', '', '不懒', '偶尔会懒一下', '懒', '非常懒');
titleList.addTitle(2, '用下面的一种动物代表自己的性格', '', '小狗', '兔子', '猫咪', '小鸟');
titleList.addTitle(3, '吃过晚饭后，你一般会选择做', '', '看书', '散步', '追剧', '玩手机');
titleList.addTitle(4, '送你一栋别墅，你会希望是在哪里？', '', '湖边', '森林', '大城市', '景点');
titleList.addTitle(5, '曾经喜欢的东西，你会怎样处理？', '', '别人不说看不出来', '可以从话中听出来', '表情中能够感受到', '只需要一个眼神');
titleList.addTitle(6, '情侣之间如果没有什么感觉了，你会怎么办？', '', '离开', '继续维持着', '迷茫', '重新寻找属于自己的爱情');
titleList.addTitle(7, '你会不喜欢和哪种人做朋友？', '', '邋遢', '不太聪明的人', '心思很重的人', '懒散懈怠的人');
titleList.addTitle(8, '假如用十年的寿命换回过去或穿越未来的十天时间，你会怎么分配？', '', '回到过去', '穿越未来', '过去的就过去了，未知的正在经历', '各去五天');
titleList.addTitle(9, '你对自己的哪里不满意？', '', '外貌', '身高', '品位', '性别');
titleList.addTitle(10, '你最喜欢的运动是什么？', '', '登山', '篮球', '羽毛球', '游泳');


// 根据titleList渲染页面---------------------------------------------------------------
let subject = document.querySelector('.subject');
let sbjOption = document.querySelector('#sbjOption');
let h1part = document.querySelector('.h1part');
let h3part = document.querySelector('.h3part');
let progress = document.querySelector('.progress');
let titleArea = document.querySelector('.title-area');
let btn = document.querySelector('#prevBtn');
render(titleList[titleNum]);
// 渲染页面-------------------------------------------------------------------------
function render(obj) {
    // 更换题目
    subject.innerHTML = obj.title;
    // 没次渲染前清空ul中的内容
    sbjOption.innerHTML = '';
    // 添加选项
    obj.option.forEach((item, index) => {
        // 创建li
        let li = document.createElement('li');
        // 添加内容
        li.innerHTML = `
            <label for="${String.fromCharCode(65 + index)}">
                <span>${String.fromCharCode(65 + index)}</span>
                ${item}
                <input id="${String.fromCharCode(65 + index)}" type="radio" name="${obj.id}" value="${String.fromCharCode(65 + index)}">
            </label>
             `
        // 将li添加到ul中
        sbjOption.appendChild(li);
        // 为选项li添加点击事件
        li.addEventListener('click', optionClick,true);
    });
    // 渲染题号
    h1part.innerHTML = `<span>${titleNum + 1}</span>/${titleList.length}`;
    // 渲染进度条
    progress.style.width = (titleNum + 1) / titleList.length * 100 + '%'
}

// 选项点击事件
function optionClick() {
    // 添加或修改答案
    reviseAnswer(this)
    if (titleNum < titleList.length) {
        if (titleNum < titleList.length - 1) {
            titleNum++;
            render(titleList[titleNum]);
            histolyTitle();// 判断当前题目是否已经做过
        } else {
            titleNum++;
            countResult();//计算分数
            resultRender();// 渲染结果页面
        }
    }
}
// 遍历答案列表计算分数--------------------------------------------------------------
function countResult() {
    for (const key of answerList) {
        switch (key) {
            case 'A': {
                result += 2;
                break;
            };
            case 'B': {
                result += 3;
                break;
            };
            case 'C': {
                result += 4;
                break;
            };
            case 'D': {
                result += 5;
                break;
            };
        }
    };
}

// 返回结果--------------------------------------------------------------------------
function returnOption() {
    // 遍历数组
    for (let i = 0; i < optionObj.length; i++) {
        const element = optionObj[i];
        if (element.min <= result && result <= element.max) {
            return element.content;
        }
    }
}

// 渲染结果页面---------------------------------------------------------------------
function resultRender() {
    titleArea.innerHTML = '';
    let div = document.createElement('div');
    div.innerHTML = ` <div class="option-area">
    <h4>您的分数为：<span>${result} </span>分！！</h4>
    <span>${returnOption()}</span>
</div>`;
    titleArea.appendChild(div);
    btn.innerHTML = '再做来一遍！';
}

// 上一题按钮-------------------------------------------------------------------------
btn.addEventListener('click', function () {
    // 根据上一题的题目序号重新渲染页面
    if (titleNum == 0) {
        alert('已经是第一题了')
    } else if (titleNum == titleList.length) {
        // 重新加载页面
        location.reload();
    } else {
        titleNum--;
        render(titleList[titleNum]);
        // 加载历史记录
        histolyTitle();

    }
});

// 判断当前题目是否已经做过 历史--------------------------------------------------------
function histolyTitle() {
    if (titleNum < answerList.length) {
        // 勾选历史选择
        sbjOption.children[answerList[titleNum].charCodeAt() - 65].querySelector('input').checked = true;

    }
}

// 添加或修改答案---------------------------------------------------------------------
function reviseAnswer(thisdom) {
    // 获取点击的答案  存入答案数组
    let answer = thisdom.children[0].children[0].innerHTML;
    // 点击后进入下一题
    if (titleNum == answerList.length) {
        answerList.push(answer);
    } else if (titleNum < answerList.length) {
        answerList[titleNum] = answer
    }
}

// 倒计时定时器-----------------------------------------------------------------------
let timer = setInterval(function name(params) {
    s--;
    let m = parseInt(s / 60);
    m = m < 10 ? '0' + m : m;
    let ss = s % 60;
    ss = ss < 10 ? '0' + ss : ss;
    h3part.innerHTML = m + ':' + ss;
    if (s == 0) {
        clearInterval(timer);
    }
}, 1000);