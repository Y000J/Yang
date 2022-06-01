window.onload = function () {
    // 轮播图案例
    // 获取dom-----------------------------------------------------
    let banner = document.querySelector('.banner');
    let left = document.querySelector('.left');
    let right = document.querySelector('.right');
    let ul = banner.querySelector('ul');
    let ol;
    function load() {
        ol = banner.querySelector('.indicator')
    }
    load();

    // 变量--------------------------------------------------------
    // 控制轮播页码
    let page = 0
    // 节流阀
    let flag = true;

    // 1.鼠标经过banner区域显示左右按钮------------------------------
    banner.addEventListener('mouseenter', function () {
        left.style.display = 'block';
        right.style.display = 'block';
        // 停止定时器
        clearInterval(timer);
    });
    banner.addEventListener('mouseleave', function () {
        left.style.display = 'none';
        right.style.display = 'none';
        // 启动定时器
        timer = setInterval(function () {
            right.click();
        }, 2000);
    });

    // 2.点击右侧按钮一次，图片往左播放一张---------------------------
    //克隆第一张图片放到最后(无缝移动)
    let first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 右按钮
    right.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (page == ul.children.length - 1) {
                page = 0;
                ul.style.left = 0 + 'px';
            }
            page++;
            animate(ul, -800 * page, function () {
                flag = true;
            });
            circle();
        }

    });

    // 左按钮
    left.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (page == 0) {
                page = ul.children.length - 1;
                ul.style.left = -800 * page + 'px';
            }
            page--;
            animate(ul, -800 * page,function () {
                flag = true;
            });
            circle();
        }
    });

    // 3.图片播放时，下面的小圆圈跟随一起动---------------------------
    // 创建小圆圈
    for (let i = 0; i < ul.children.length - 1; i++) {
        // 根据ul中图片的数量创建小圆圈
        let li = document.createElement('li');
        ol.appendChild(li);
    };
    // 第一个li默认active
    ol.children[0].className = 'active';

    // 圆圈点击事件
    for (let i = 0; i < ol.children.length; i++) {
        ol.children[i].addEventListener('click', function () {
            page = i - 1;
            right.click();
            circle()
        })
    }

    // 圆圈跟随
    function circle() {
        // 添加小圆圈lia后重新加载ol
        load();
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        };
        page == ol.children.length ? ol.children[0].className = 'active' : ol.children[page].className = 'active';
    };

    // 自动播放 ---------------------------------------------------
    let timer = setInterval(function () {
        right.click();
    }, 2000)
}