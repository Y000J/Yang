$(function () {

    // 1.全选按钮  checkall  使用change事件
    $(".checkall").change(function () {
        //另一个全选按钮chaeckall 也要勾选上 
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        //添加选中背景色
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
        getSum();

    });
    // 当单选全部被选上  自动勾选全选按钮  每次点击单选时判断勾选了几个选框
    $(".j-checkbox").change(function () {
        // $(".j-checkbox:checked").length返回选中单选框的个数
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);

        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
        getSum();

    });

    // 2.增减商品数量
    $(".increment").click(function () {
        // 取文本框内的值
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        // 3.修改商品小计
        // 当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        //当前商品的小计
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (n * p).toFixed(2));
        getSum();


    });
    $(".decrement").click(function () {
        // 取文本框内的值
        var n = $(this).siblings(".itxt").val();
        // 如果值为1 则结束程序  不再减
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        // 当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        //当前商品的小计
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (n * p).toFixed(2));
        getSum();

    });
    // 4.修改文本框内的数量后 从新计算小计
    $(".itxt").change(function () {
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        //当前商品的小计
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + ($(this).val() * p).toFixed(2));
        getSum();

    });

    // 5.计算总计和总额
    // 封装一个函数进行计算
    function getSum() {
        //总件数  count
        var count = 0;
        // 总价钱
        var money = 0;
        // 遍历所有itxt 拿到所有value  相加
        // $(".itxt").each(function (i, ele) {
        //     count += parseInt($(ele).val());
        // });
        // $(".amount-sum em").text(count);

        //勾选的val
        $(".j-checkbox:checked").parent().siblings(".p-num").children(".quantity-form").children(".itxt").each(function (i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);


        $(".j-checkbox:checked").parent().siblings(".p-sum").each(function (i, ele) {
            var p = $(ele).html();
            p = parseFloat(p.substr(1));
            money += p;
        });
        $(".price-sum em").text("￥" + money.toFixed(2));

    };
    getSum();

    //6.删除按钮
    $(".p-action a").click(function () {
        $(this).parents(".cart-item").remove();
        getSum();

    });
    //删除选中的商品
    $(".remove-batch").click(function () {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();

    });

    //清空购物车
    $(".clear-all").click(function () {
        $(".cart-item").remove();
        getSum();

    });
})