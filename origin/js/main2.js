console.log("加载成功");
/* 配置当前项目引入的模块 */
_require.config({
    paths:{
        "jquery": "jquery",
        "login": "login" 
    }
})

_require(['login'],function(login){
    login.loginSend();
})