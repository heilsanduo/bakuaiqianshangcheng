$(function () {
    // 手机验证
    function telphone() {
        let phone = $("#phoneNum").val();//手机号码 
        if (phone) {
            let telReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (telReg.test(phone)) {
                $('#phone_wrong_msg').css('display', 'none');
                $('#phoneNum').removeClass('error');

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
    // 密码验证
    function checkPsw() {
        let val = $('#login_password_num').val();
        if (val) {
            let pswReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/g;
            if (pswReg.test(val)) { //密码校验通过  
                $('#login_password_wrong_msg').css('display', 'none');
                $('#login_password_num').removeClass('error');
            } else {
                $(this).val('');
                $('#login_password_wrong_msg').css({ 'display': 'block' });
                $('#login_password_wrong_msg').html('密码和手机号不正确');
                $('#login_password_num').addClass('error');
            }
        } else {
            $('#login_password_wrong_msg').css({ 'display': 'block' });
            $('#login_password_wrong_msg').html('密码不能为空');
            $('#login_password_num').addClass('error');
        }
    }
    //数据校验
    $('#phoneNum').blur(function () {
        telphone();
    })
    $('#login_password_num').blur(function () {
        checkPsw();
    })
    $('#login_btn').click(function () {
        telphone();
        checkPsw();
        // let phone = $('#phoneNum').val();
        // let psw = $('#login_password_num').val();

        // if ($('.error').length < 0) {
        //     $.ajax({
        //         type: 'POST',
        //         url: '../api/user.php',
        //         data: `m=register&name=${phone}&password=${psw}`,
        //         success: function (res) {
        //             if (res == 'yes') { //匹配成功
        //                 location.href = '../index.html'

        //             } else {//手机或密码不对
        //                 $('#psw').val('');
        //                 $('.login_password_wrong_msg').css({ 'display': 'block' });
        //                 $('.login_password_wrong_msg').html('手机或密码不对');
        //                 $('#login_btn').css('background', '#EFEFEF');
        //             }
        //         }
        //     })
        // } else {
        //     // console.log('请填写完整信息');
        //     return false;
        // }

    })

})