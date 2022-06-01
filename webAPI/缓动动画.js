
function animate(obj, target, callback) {
    //清除以前的定时器
    clearInterval(obj.timers);
    obj.timers = setInterval(function () {
        //步长值(target-obj.offsetLeft)/10
        var step = (target - obj.offsetLeft) / 10;
        //将步长值改为整数
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //判断是否停止
        if (obj.offsetLeft == target) {
            clearInterval(obj.timers);
            //回调函数
            // if (callback) {
            //     callback();
            // }
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)
}