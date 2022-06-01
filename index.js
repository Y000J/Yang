window.addEventListener('load', function () {
    // ----------------------网页轮播图---------------------------------
    var arrow_l = document.querySelector('.prev');
    var arrow_r = document.querySelector('.next');
    var banner = document.querySelector('.banner');
    var bannerWidth = banner.offsetWidth;
    //1、鼠标经过banner区域显示隐藏左右箭头
    banner.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        // 清空变量
        timer = null;
    })
    banner.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000)
    })
    //2、动态生成小圆圈
    var ul = banner.querySelector('ul');
    var ol = banner.querySelector('ol');
    for (var i = 0; i < ul.children.length; i++) {
        var li = this.document.createElement('li');
        ol.appendChild(li);
        //插入自定义函数  index  用于获取索引
        li.setAttribute('index', i);
        //3、小圆圈排他思想
        li.addEventListener('click', function () {
            //清除所有active 类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'active';
            //4、点击小圆圈移动图片  移动的是ul  点击那个小圆圈就拿到他的索引号 index
            var index = this.getAttribute('index');
            animate(ul, -index * bannerWidth);
            // 将点击后的index传递给circle 和num
            num = circle = index;
        })
    }
    ol.children[0].className = 'active';
    //克隆第一张图片放到最后
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //5、点击箭头切换图片
    //声明一个全局变量 num 控制箭头按钮
    var num = 0;
    // 声明一个全局变量 circle 控制小圆圈变化
    var circle = 0;
    //节流阀  控制左右按钮点击过快
    var flag = true;
    // 右侧按钮
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            console.log(ul.offsetLeft);
            animate(ul, -num*bannerWidth, function () {
                flag = true;
            })
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            exclude();
        }
    })

    // 左侧按钮
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * bannerWidth + 'px';
            }
            num--;
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            exclude();
            animate(ul, -num * bannerWidth, function () {
                flag = true;
            });

        }
    })
    //自动播放轮播图
    var timer = setInterval(function () {
        arrow_r.click();
    }, 2000)
    //排他函数
    function exclude() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'active';
    }

})