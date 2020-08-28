define(['jquery'], 
function($) {
    function loginSend(){
        var user_lock = false;
        var pass_lock = false;
        $("#username").blur(function(){
            var val = $("#username").val();
            var reg = /^[^\d]\w{6,10}$/;
            if (!reg.test(val)) {
                $(".check").html("<em style ='font-style: normal;color:red;'>账号不符合规范</em>");
                user_lock = false;
                return;
            }
            $(".check").html("");
            user_lock = true;
        });
        $("#password").blur(function () {
            var val =  $("#password").val();
            var reg = /^[^\d]\w{6,10}$/;
            if (!reg.test(val)) {
                $(".check").html("<em style ='font-style: normal;color:red;'>密码不符合规范</em>");
                pass_lock = false;
                return;
            }
            pass_lock = true;
        })
        $("#subBtn").click(function(){
            $.ajax({
                type:"post",
                url:"../../php/login.php",
                data:{
                    username:$("#username").val(),
                    password:$("#password").val()
                },
                success:function(result){
                    var obj = JSON.parse(result);
                    if(!(obj.error)){
                        var targetURL = location.hash.slice(1) || "../index.html";
                        console.log(targetURL);
                        $(".check").html("<em style ='font-style: normal;color:red;'>登录成功</em>");
                        location.href = targetURL;
                    }
                    else{
                        $(".check").html("<em style ='font-style: normal;color:red;'>登录失败</em>");
                    }

                },
                error:function(msg){
                   console.log(msg);
                }
            })
        })
    }
    return {
        loginSend:loginSend    
    }
});