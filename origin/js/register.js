define([
    'jquery'
], function($) {
    function registerSend(){
        $("#subBtn").click(function(){
            $.ajax({
                type:"post",
                url:"../../php/register.php",
                data:{
                    username:$("#username").val(),
                    password:$("#password").val(),
                    createtime:(new Date()).getTime()
                },
                success:function(result){
                    var obj = JSON.parse(result);
                    if(!(obj.error)){
                        var targetURL = location.hash.slice(1) || "./login.html";
                        console.log(targetURL);
                        $(".check").html("<em style ='font-style: normal;color:red;'>注册成功</em>");
                        location.href = targetURL;
                    }
                    else{
                        $(".check").html("<em style ='font-style: normal;color:red;'>注册失败，账户已存在</em>");
                    }

                },
                error:function(msg){
                    console.log(msg);
                }
            })
        })
    }

    return{
        registerSend:registerSend
    }
    
});