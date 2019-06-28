$(function () {
    //js公共库：注册登录页面手机号码等验证
    // 验证码 倒计时
    function sendMessage() {
        var code = ""; //接收验证码   
        $('#btnSendCode').click(function () {
            var count = 60;
            var phone = $("#phoneNum").val();//手机号码  
            // telphone();
            //开始计时  
            $('#btnSendCode').css('background', '#EFEFEF');
            $("#btnSendCode").attr('disabled', 'disabled');
            $("#btnSendCode").html("倒计时" + count + "秒");
            var timer = setInterval(function () {
                count--;
                $("#btnSendCode").html("倒计时" + count + "秒");
                if (count == 0) {
                    clearInterval(timer);
                    $("#btnSendCode").attr("disabled", false);//启用按钮  
                    $('#btnSendCode').css('background', '#FFDE45');
                    $("#btnSendCode").html("重新发送验证码");
                    code = "";//清除验证码。如果不清除，过时间后，输入收到的验证码依然有效 
                }
            }, 1000);

            //向后台发送处理数据  
            // $.ajax({
            //     type: "POST", //用POST方式传输  
            //     dataType: "text", //数据格式:JSON  
            //     url: '', //目标地址  
            //     data: "phone=" + phone + "&code=" + code,
            //     error: function (XMLHttpRequest, textStatus, errorThrown) { },
            //     success: function (msg) { }
            // });
        });
    }

    // 手机验证
    function telphone() {
        let phone = $("#phoneNum").val();//手机号码 
        if (phone) {
            let telReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (telReg.test(phone)) {
                $('#phone_wrong_msg').css('display', 'none');
                $('#phoneNum').removeClass('error');
                // $("#btnSendCode").css({ "background-color": "#FFDE45" });

            } else {
                $('#phone_wrong_msg').css({ 'display': 'block' });
                $('#phone_wrong_msg').html('请输入正确的手机号');
                $('#phoneNum').addClass('error');
                return false;
            }
        } else {
            $('#phone_wrong_msg').css({ 'display': 'block' });
            $('#phone_wrong_msg').html('手机号码不能为空');
            $('#phoneNum').addClass('error');
        }

    }
    //code 验证
    function code_test() {
        if ($('#phoneCode').val() == '') {
            $('#phoneCode').val('');
            $('#code_wrong_msg').css({ 'display': 'block' });
            $('#code_wrong_msg').html('验证码不能为空');
            $('#phoneCode').addClass('error');
        } else {
            $('#code_wrong_msg').css('display', 'none');
            // $.ajax({ //验证码匹配
            //     type: 'POST',
            //     url: '../api/user.php',
            //     data: `m=checkcode&captcha=${val}`,
            //     success: function (data) {
            //         let json = JSON.parse(data);
            //         if (json.code) { //验证码正确

            //             // console.log('验证码验证成功', isokarr);
            //             $('#code_wrong_msg').css('display', 'none');
            //             $('#phoneCode').removeClass('error');
            //         } else {
            //             $('.#code_wrong_msg').css({ 'display': 'block' });
            //             $('#code_wrong_msg').html('验证码不正确');
            //             $('#phoneCode').addClass('error');
            //         }
            //     }
            // })
        }
    }


    //数据校验
    $('#phoneNum').blur(function () {
        telphone();
    })
    $('#phoneCode').blur(function () {
        code_test();
    })

    $('.phone_login_footer_now').click(function () {
        telphone();
        code_test();
        // if ($('.error').length > 0) { //不通过验证
        //     // return false;
        //     // $('#code_wrong_msg').css({ 'display': 'block' });
        //     // $('#code_wrong_msg').html('验证码不对');
        //     console.log("不通过验证");

        // } else {//通过验证

        //     let phone_num = $('#phoneNum').val();
        //     $.ajax({
        //         type: 'POST',
        //         url: '../api/user.php',
        //         data: `m=register&name=${phone_num}`,
        //         success: function (data) {
        //             if (JSON.parse(data).code) { //登录成功
        //                 location.href = '../index.html'
        //             } else {//登录失败
        //                 return false;
        //             }
        //         }
        //     })
        // }

    })

})