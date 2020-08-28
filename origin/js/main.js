console.log("加载成功");
/* 配置当前项目引入的模块 */
_require.config({
    paths:{
        "jquery": "jquery",
        "register": "register" 
    }
})

_require(['register'],function(register){
    register.registerSend();
})