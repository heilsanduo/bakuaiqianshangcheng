$(function() {
    //选项卡
    $("#myorder-box-top div").click(function() {
        //点击当前的变高亮+排他
        $(this)
            .addClass("myorder-active")
            .siblings("div")
            .removeClass("myorder-active");
        //内容跟着出来
        $("#myorder-box-bottom .option")
            .eq($(this).index())
            .css("display", "block")
            .siblings()
            .css("display", "none");
    });
});
