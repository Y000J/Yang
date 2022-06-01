let hour = document.querySelector('#h');
let minute = document.querySelector('#m');
let second = document.querySelector('#mm');


// 预定时间
let time = +new Date('2022-5-17 11:48:00');
// 预定时间大于现在的时间清除本地存储的timer
if (time > new Date()) {
    localStorage.removeItem('timer')
}
// 读取本地内存中的timer
let localTimer = localStorage.getItem('timer')
// 剩余的秒数
let timer = localTimer;
// 倒计时函数
function counDown() {
    // 现在的时间
    let nowTime = new Date();
    // 预计时间减去现在的时间,剩余的总秒数
    timer = (time - nowTime) / 1000;
    if (timer < 0) {
        localStorage.setItem('timer', timer)
    }
    // 剩余的小时
    let h = parseInt(timer / 60 / 60 % 24);
    h = h < 10 ? '0' + h : h;
    hour.innerHTML = h;
    // 剩余的分钟
    let m = parseInt(timer / 60 % 60);
    m = m < 10 ? '0' + m : m;
    minute.innerHTML = m;
    // 剩余的秒
    let s = parseInt(timer % 60);
    s = s < 10 ? '0' + s : s;
    second.innerHTML = s;
    console.log(s);

}

// 定时器
if (timer >= 0) {
    let times = setInterval(function () {
        if (timer < 0) {
            clearInterval(times)
        } else {
            counDown();
        }
    }, 1000);
}
