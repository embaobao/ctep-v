// 注册组件

// 注册
Vue.component('nav-iteam', {
    props: ['i'],
    template: '<li class="nav-item"><a class="nav-link" href="javascript:void(0)">{{i.name}}<i v-bind:class="i.icoclass"></i> </a></li>'
})

// Vue.component('modol',
// {
//  props:[m],
//  template:''
//     
//     
// }
// )
// 

















var page = new Vue({
    el: '#page',
    methods: {
        get: function(url, data) {
            //发送get请求
            this.$http.get(url, {
                params: data
            }).then(function(res) {
                document.write(res.body);
            }, function(res) {
                console.log(res.status);
            });
        },
        post: function(url, data) {
            //发送 post 请求
            this.$http.post(url, data, {
                emulateJSON: true
            }).then(function(res) {
                document.write(res.body);
            }, function(res) {
                console.log(res.status);
            });
        }
    }

})













var navFoot = new Vue({
    el: '#navFoot',
    data: {

        conSta: true,
        conMs: "数据交换正常",
        appTip: {
            title: "系统信息",
            body: "欢迎使用EMB评价管理系统"
        }

    },
    methods: {
        get: function() {
            //发送get请求
            Vue.http.get('http://127.0.0.1:8848/CTM/index.html').then(function(res) {
                document.write(res.body);
            }, function() {
                console.log('请求失败处理');
            });
        }
    },
    computed: {
        conStaIco: function() {

            return {
                'fa fa-fw': true,
                'fa-check': this.conSta,
                'fa-close': !this.conSta
            }

        },
        conStabg: function() {
            return {
                'badge badge-success': this.conSta,
                'badge badge-secondary': !this.conSta
            }

        }

    }


});



var navTop = new Vue({
    el: '#navTop',
    data: {
        items: [{
                name: '我的评价',
                icoclass: {
                    'fa fa-fw fa-pencil': true
                }
            },
            {
                name: '评价历史',
                icoclass: {
                    'fa fa-fw fa-history': true
                }
            },
            {
                name: '数据管理',
                icoclass: {
                    'fa fa-fw fa-hdd-o': true
                }
            },
            {
                name: '数据分析',
                icoclass: {
                    'fa fa-fw fa-database': true
                }
            },
            {
                name: '关于我们',
                icoclass: {
                    'fa fa-fw fa-question-circle-o': true
                }
            },
            {
                name: '问题帮助',
                icoclass: {
                    'fa fa-fw fa-phone': true
                }
            },
            {
                name: '注册账户',
                icoclass: {
                    'fa fa-fw fa-vcard-o': true
                }
            }
        ],
        user: {
            name: '请登录',
            userID: '',
            userPassWord: '',
            userRole: '学生',
            userStatus: false
        },
        userInfo: {
            userImg: '',
            pending: [{
                subject: '',
                affairDescription: ''
            }],
            messageBox: [{
                messageSender: '',
                messageSubject: ''
            }],
            favorites: [{
                title: '',
                content: ''
            }]
        }

    }

});





















// ----------------------JQ----------------------



$(document).ready(function() {

    $('[data-toggle="popover"]').popover();



    $(".card-close").bind("click", function() {
        var e = $($(this).parent().parent());
        e.remove();
        $.each($("#loadpage-panel>li"), function(index, value) {
            if ($(this).attr("data-cardid") == e.prop("id")) {
                $(this).remove();
            }
        });

        // 		for ( li in $("#loadpage-panel>li")) {
        // 			if (li.attr("data-cardid") == e.attr("id")) {
        // 				li.remove();
        // 				break;
        // 			}
        // 		}

    });



    $(".card-min").bind("click", function() {
        var e = $($(this).parent().parent());
        e.hide();
        var add = 1;
        // $("#loadpage-panel>li").length
        $.each($("#loadpage-panel>li"), function(index, value) {
            if ($(this).attr("data-cardid") == e.prop("id")) {
                // $(this).hide();
                // $(this).remove();
                // addLoadpageico(e.children().children(".card-title").text(), e.prop("id"));
                add = 0;
                return false;
            }
        });

        if (add != 0) {
            addLoadpageico(e.children().children(".card-title").text(), e.prop("id"));
        }

    });

    $(".card-open").bind("click", function() {
        $("#" + $(this).attr("data-cardid").toString()).toggle();
    });


    function addLoadpageico(icoName, panelName) {
        var i = parseInt($("#loadpage-panel>li").length) + 1;
        $("#loadpage-panel").prepend("<li id=loadpageico_'" + i.toString() +
            "' class=' card-open nav-item' data-cardid='" +
            panelName + "'><a class='nav-link'>" +
            i.toString() + ":" + icoName.toString() +
            "<i name='' class='fa fa-circle-o fa-fw'></i></a></li>");
        $(".card-open").bind("click", function() {
            $("#" + $(this).attr("data-cardid").toString()).toggle();
        });

    }

    $("#email").keyup(function(event) {
        console.log(navTop.user.userID);
    });



    $("#pwd").keyup(function() {
        console.log(navTop.user.userPassWord);
    });

    $('#closeLoginmodal').click(function() {

        $('#myModal').modal('hide');

    });

    // 测试按钮
    $("#testbt").click(function() {

    });

    // 测试数据连接改变状态
    function change() {


        if (navFoot.conSta) {
            navFoot.conSta = false;
        } else {
            navFoot.conSta = true;
        }
        // app.applacation.conSta==true ? false : true;
        alert(navFoot.conSta);

    }






    // startAniBG();
    // loadingShow();
    // endAniBG();
    // loadingHide();

});



// -------------------------VUE------------------











// vue 监视链接状态

navFoot.$watch('conSta', function(nval, oval) {

    if (nval) {
        navFoot.conMs = "连接正常";
    } else {

        navFoot.conMs = "连接服务失败 -无法数据交换";

    }
    alert("修改:" + nval);
    navFoot.$forceUpdate();
    console.log(navFoot.conMs);

});
