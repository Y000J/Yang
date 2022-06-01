// 匀速动画函数
function animation(obj, target, test, callback) {
    // 每次运行要清除以前的定时器
    clearInterval(obj.timers);
    obj.timers = setInterval(function () {
        let te = obj.offsetLeft - target;
        let test1 = te < 0 ? test : -test
        console.log(test1);
        // 判断是否停止
        if (te > 0 ? obj.offsetLeft <= target : obj.offsetLeft >= target) {
            clearInterval(obj.timers);
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + test1 + 'px'
    }, 15)
}
