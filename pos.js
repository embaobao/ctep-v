

var _posconfig = {
    baseUrl: "http://localhost:55810/",
    actionList: [
        { name: "login", url: "User/Login/", data: { id: 1, email: "1132067567@qq.com", pw: 123, role: 0 } },
        { name: "register", url: "User/register/", data: { id: 1, email: "1132067567@qq.com", pw: 123, role: 0 } }
    ],
    responseList: [
        { name: "login", func: function (data) { console.log(this.name + "响应处理器 收到数据:" + data); } },
        { name: "register", func: function (data) { console.log(this.name + "响应处理器 收到数据:" + data); } }
    ],
    triggerList: [
        { name: "#login", action: "login", event: "click" },
        { name: "#register", action: "register", event: "click", index: -1, },
    ],
}

function POS() {

    //jq 中的 post 对象 return { data: data, status: status };
    this._post = function (url, obj) {
        const result = { status: {}, data: {} };
        $.post(url, obj, function (data, status) {
            result.status = status;
            result.data = data;
        });
        return result;
    };
    //网站根URL
    this.baseUrl = _posconfig.baseUrl;
    // 动作列表
    this.actionList = _posconfig.actionList;
    //响应列表
    this.responseList = _posconfig.responseList;
    //触发器列表
    this.triggerList = _posconfig.triggerList;
    // 数据列表
    this.dataList = [];

    //动作 得到数据 
    this.Do = function (activ, data, index) {
        let items = this.actionList;
        for (var i in items) {
            let act = items[i];
            if (act.name == activ) {
                console.log("《—————————————————————动作运行——————————————————————》");
                console.log("生成动作 url:" + this.baseUrl + act.url);
                console.log("提交数据↓:");
                console.log(data);
                console.log("提交数据↑:");
                let res = this._post(this.baseUrl + act.url, data);
                this.responseList.forEach(element => {
                    if (element.name == activ) {
                        // let res=1 测试数据
                        console.log("-↓");
                        console.log("动作:" + activ + "的响应数据↓");
                        console.log(res);
                        console.log("--↓");
                        console.log("执行动作:" + activ + "响应配置表中的响应操作");
                        element.func(res);
                        console.log("---↓");

                        if (arguments.length == 2) {
                            console.log("系统写入标识符 index:" + i);
                            index = i;
                        } else {
                            console.log("写入标识符 index:" + index);
                        }
                        console.log("---↓");
                        console.log("写入数据列表");
                        this.dataList.push({ name: activ, response: res, index: index });
                        console.log("---↓");
                        console.log("《——————————数据列表数据显示:↓———————————》");
                        for (const i in this.dataList) { console.log(this.dataList[i]); }
                        console.log("《———————————数据列表数据显示↑———————————》");
                        return res;
                    }

                });

            }
        }

    };

    this.DoIt = function (activ, index) {

        let items = this.actionList;
        for (var i in items) {
            let act = items[i];
            if (act.name == activ) {

                if (arguments.length == 1) {
                    this.Do(activ, act.data);
                }
                else {
                    this.Do(activ, act.data, index);
                }

            }
        }


    }

    //通过行为与得到的数据绑定
    this.Bind = function (activ, func) {
        console.log("已绑定" + activ + "数据队列处理器");
        //获取数据列表
        let items = this.dataList;
        for (var i in items) {

            let act = items[i];
            console.log("遍历数据列表数据显示:↓");
            console.log(act);
            if (act.name == activ) {
                console.log("捕获动作:" + activ + "的响应数据:");
                console.log(act.response);
                try {
                    console.log("数据列表数据已传入->动作:" + activ + "的响应处理器！");
                    func(act);
                } catch (error) {
                    return error;
                }
                this.dataList.splice(i, 1);
                console.log("动作:" + activ + "的响应数据处理完成,数据弹出数据列表！");
                console.log("《——————————数据列表数据显示:↓——————————————————————》");
                for (const i in this.dataList) { console.log(this.dataList[i]); }
                console.log("《———————————数据列表数据显示↑——————————————————————》");
                return true;
            }
        }


    }



    this.triggerRegister = function () {
        // 注册激活器事件
        console.log("POS 初始化->独立实例 每一个激发器都是新的POS对象发起的 注册激活器事件:↓");
        let triggers = _posconfig.triggerList
        for (const i in triggers) {
            let trigger = triggers[i]

            console.log("注册激活器事件:" + trigger.action + "↓");
            console.log("激活器:" + trigger.name + "↓");
            $(trigger.name).on(trigger.event, function () {
                 console.log("———————————————————————————————trigger-index——》"+trigger.index);
                if (trigger.index < 0||trigger.index==null) {
                    new POS().DoIt(trigger.action);
                }
                else {
                    new POS().DoIt(trigger.action, trigger.index);
                }

            });
        }

        console.log("《————数据列表数据显示:↓——》");
        for (const i in this.dataList) { console.log(this.dataList[i]); }
        console.log("《————数据列表数据显示↑————》");



    }

    this.triggersRegister = function (pos) {
        // 注册激活器事件
        console.log("POS 初始化->公用实例 共享传入的POS对象 数据队列 注册激活器事件:↓");
        let triggers = _posconfig.triggerList
        for (const i in triggers) {
            let trigger = triggers[i]
            console.log("注册激活器事件:" + trigger.action + "↓");
            console.log("激活器:" + trigger.name + "↓");
            $(trigger.name).on(trigger.event, function () {
                console.log("———————————————————————————————trigger-index——》"+trigger.index);
                if (trigger.index < 0||trigger.index==null) {
                    pos.DoIt(trigger.action);
                }
                else {
                    pos.DoIt(trigger.action, trigger.index);
                }

            });
        }

        console.log("————————————————————数据列表数据显示:↓——————————————————————");

        for (const i in this.dataList) { console.log(this.dataList[i]); }
        console.log("----↓");
        

    }


    console.log("POS 初始化开始状态:↓");
    console.log(this instanceof POS);
}

function POSIni(pos) {
    pos.triggersRegister(pos);
    console.log("《—————————————————————POS 公用实例 初始化完成！——————————————————————》");
}
function POSini(pos) {
    pos.triggerRegister();
    console.log("《—————————————————————POS 独立实例 初始化完成！——————————————————————》");
}

// _posconfig.activeList = [];
// console.log(pos._post("http://localhost:55810/User/Login/", { email: "1132067567@qq.com", pw: 123, role: 0 }));

//网站根URL
window.onload = function () {
    // POSIni(new POS());
    POSIni(new POS());
}

// var pos = new POS();

// pos.DoIt("login", 5);

// pos.Bind("login", function (act) {
//     console.log("添加绑定" + act.name + "数据处理器");
//     console.log("接收" + act.name + "动作数据");
//     console.log(act.response);
// });



