function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("欢迎 " + user + " 再次访问");
    } else {
        user = prompt("请输入你的名字:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 30);
        }
    }
}






function pushCookie(userObj) {
    var BCode = new Base64();
    setCookie("emb_user", BCode.encode(JSON.stringify(userObj)), 2);
}


function ChckUserForCookie() {
    var BCode = new Base64();
    var user={id:-1};
    try{
        user = JSON.parse(BCode.decode(getCookie("emb_user")));
    }catch{

    }
    if (user.id > 0) {
        
        layer.msg('登录');
        // --------------------------------打开弹框
        // layer.open({
        //     skin: 'demo-class',
        //     title: '在线调试',
        //     content: '可以填写任意的layer代码'
        // });

        console.log(user.email + "登录");
    } else {
        // layer.msg('没有登录！');
        //  layer.open({
        //     skin: 'demo-class',
        //     title: '登录提示',
        //     content: '您还没有登录，是否登录？'
            
        // });
        // var index=layer.open({
        //     type: 2, 
        //     content: ['register.html',true] //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
        //   }); 
          
        //   layer.iframeAuto(index) ;
        // layer.full(index);
        //   layer.tips('只想提示地精准些', '#menu');
        console.log("没有登录！");
    }
}