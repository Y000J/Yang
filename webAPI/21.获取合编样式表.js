
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