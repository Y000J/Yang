/**
 * @description 缓动动画
 * @param {*} dom 要移动的元素
 * @param {*} obj 要移动的属性对象/要更改的属性值
 * @param {*} callback 回调函数
 */
function animate(dom, obj, callback) {
    //清除以前的定时器
    clearInterval(dom.timers);
    dom.timers = setInterval(function () {
        let idOK = true
        // 遍历obj对象取出键
        for (const key in obj) {
            // 取出属性值
            let target = obj[key];
            // 判断属性的类型
            if (key == 'zIndex' || key == 'backgroundColor') {
                dom.style[key] = target;
            } else if (key == 'opacity') {
                // 获取当前元素的样式属性
                // 透明度为小数
                var current = parseFloat(getStylePro(dom, key)) * 100;
                target *= 100;
                // 步长值
                var step = (target - current) / 10;
                step = current < target ? Math.ceil(step) : Math.floor(step);
                current += step;
                dom.style[key] = current / 100;
                if (current != false) {
                    isOk = false
                }
            } else {
                //步长值(target-dom.offsetLeft)/10
                current = parseFloat(getStylePro(dom, key));
                var step1 = (target - current) / 10;
                //将步长值改为整数
                step1 = current < target ? Math.ceil(step1) : Math.floor(step1);

                current += step1;
                dom.style[key] = current + 'px';
                if (current != false) {
                    isOk = false
                }
            }
        }
        if (isOk) {
            clearInterval(dom.timers);
            // 回调函数
            callback && callback();
        }

    }, 15);
}



/**
 * @description: 获取dom合编样式表的属性值
 * @param {Dom} dom 要获取的对象
 * @param {String} proName 要获取的属性
 * @returns 返回属性值
 */
function getStylePro(dom, proName) {
    // 声明合编样式表对象
    let hbStyle;
    if (window.getComputedStyle) {
        hbStyle = window.getComputedStyle(dom);
    } else { //兼容IE8
        //声明变量要使用var
        hbStyle = dom.currentStyle;
    }
    return hbStyle[proName]
}