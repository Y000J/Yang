const list = [
    { id: 1, name: '张三', age: 18, likes: ['唱', 'dance', 'rap', 'ball'] },
    { id: 2, name: '李四', age: 20, likes: ['张三', '法外狂徒', '很行'] },
    { id: 3, name: '王五', age: 22, likes: ['登山', '旅游',] },
    { id: 4, name: '赵六', age: 24, likes: ['喝酒', '宅', '游戏'] },
];
// 准备表格顺序
const heads = ['id', 'name', 'age', 'likes'];

const tbody = document.querySelector('tbody');
// 遍历列表
for (const item of list) {
    // 创建一个空tr
    const tr = document.createElement('tr');
    //填充tr
    for (const key of heads) {
        // 创建td
        const td = document.createElement('td');
        // 拿到数据
        const value = item[key]

        // 将数据填充到td    如没有这条数据填充 “空”
        td.innerHTML = value instanceof Array ? value.join('、') : value  || '空';
        tr.appendChild(td);
    }


    // 将填充好的tr追加到tbody
    tbody.appendChild(tr);
}