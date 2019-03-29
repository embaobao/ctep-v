$(document).ready(function () {
    //
    String.prototype.format = function () {
        if (arguments.length == 0) return this;
        var param = arguments[0];
        var s = this;
        if (typeof (param) == 'object') {
            for (var key in param)
                s = s.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
            return s;
        } else {
            for (var i = 0; i < arguments.length; i++)
                s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
            return s;
        }
    }


    //元数据类型声明
    // 用户
    var emb_User = {
        id: -1,
        email: "",
        pw: "",
        role: "",
        status: "",
    };
    // 用户信息
    var emb_User_info = {
        id: "",
        img: "",
        gender: "",
        name: "",
        descrition: "",
        address: "",
        BandiID: ""
    }
    // 评价表
    var emb_EvaluForm = {
        BandiId: 0,
        CourseId: 1,
        CreateId: 1,
        CreateTime: null,
        EEndTime: null,
        EStartTime: null,
        Eweek: 4,
        FormStatus: 0,
        author: "EMB",
        body: "test",
        id: 1,
        img: null,
        score: 0,
        title: "",
    }


    //组件声明
    var _EF = '<div class="alert  alert-dismissible"><button type="button"class="close"data-dismiss="alert">&times;</button>' +
        '<div id="{id}"class="card"><div class="card-header text-info">{title}</div>' +
        '<img class="card-img-top img-thumbnail img-fluid"src="{img}"alt="{title}"><div class="card-body ">' +
        '<p>{body}</p><table class="table  table-responsive table-hover text-muted"><thead><tr>' +
        '<th>授课人:</th><th>{author}</th></tr></thead><tbody><tr><td>开始时间:</td><td>{EStartTime}</td></tr><tr><td>结束时间:</td><td>{EEndTime}</td>' +
        '</tr><tr><td>分数:</td><td>{score}</td></tr><tr><td>' +
        '课程:</td><td>{CourseId}</td></tr></tbody></table></div><div class="card-footer"><a href="#">评价</a></div></div></div>';
    //元素获取基础方法
    var _val = function (select) {
        return $(select).val();
    }
    var _txt = function (select) {
        return $(selector).text();
    }
    var_htm = function (select) {
        return $(selector).html();
    }

    _posconfig = {
        baseUrl: "http://localhost:55810/",
        actionList: [
            {
                name: "登录",
                url: "User/Login/",
                data: emb_User,
            },
            {
                name: "注册",
                url: "User/register/",
                data: emb_User,
            },
            {
                name: "用户信息",
                url: "User/Info/",
                data: emb_User,
            },
            {
                name: "用户设置",
                url: "User/Set/",
                data: emb_User,
            },
            {
                name: "用户账户",
                url: "User/Account/",
                data: emb_User,
            },
            {
                name: "评价表",
                url: "User/EvaluForm/",
                data: emb_User,
            },
            {
                name: "put用户信息",
                url: "User/PutInfo/",
                data: emb_User_info,
            },
            {
                name: "评价历史",
                url: "User/PutInfo/",
                data: emb_User_info,
            },

        ],
        responseList: [
            {
                name: "登录",
                func: function (response) {
                    if (response == null) { }
                    else {
                        console.log(response);
                    }

                }
            },
            {
                name: "注册",
                func: function (response) {
                    if (response == null) { }
                    else {
                        console.log(response);
                    }

                }
            },
            {
                name: "用户信息",
                func: function (response) {
                    if (response == null) { }
                    else {
                        console.log(response);
                    }

                }
            },
            {
                name: "评价表",
                func: function (response) {
                    if (response == null) { }
                    else {
                        response.forEach(element => {
                            if (element.img == null) element.img = "images/items/timg.jpg";
                            $("#efList").prepend(_EF.format(element));
                        });
                    }

                }
            },
            {
                name: "用户设置",
                func: function (response) {
                    if (response == null) { }
                    else {
                        console.log(response);
                    }

                }
            }


        ],
        triggerList: [
            { name: "#login", action: "login", event: "click" },
            { name: "#register", action: "register", event: "click", index: -1 },
        ],
    }

    emb_User.id = 1;
    emb_User.email = "1132067567@qq.com";
    emb_User.pw = "123";
    emb_User.role = 0;

    var pos = new POS();
    pos.DoIt("评价表");
    pos.DoIt("");

    // var pos = new POS();

});