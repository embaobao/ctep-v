

var _posconfig = {
    baseUrl: "http://localhost:55810/",
    actionList: [
        { name: "login", url: "user/login", data: { id: 1, email: "1132067567@qq.com", role: 0 } }
    ],
    responseList: [
        { name: "login", func: function (data) { console.log("收到数据:"+data);} }
    ],
    triggerList: [
        { name: "#id", action: "login", event: "click" }
    ],
}

function POS() {
    //post 对象
    this._post = function (url, obj) { $.post(url, obj, function (data, status) { return { data: data, status: status }; }); };
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



    //活动 得到数据 
    this.Do = function (activ, data, i) {
        let items = this.actionList;
        for (var i in items) {
            let act = items[i];
            if (act.name == activ) {
                console.log("生成动作 url:" + this.baseUrl + act.url);
                console.log("提交:");
                console.log(data);
                // let res = this._post(this.baseUrl + act.url, data);
                this.responseList.forEach(element => {
                   if(element.name=activ)
                   {
                    let res=1
                    console.log("执行 动作响应 表中配置的" + activ + "活动的 响应操作");
                       element.func(res);
                   } 
                });
                this.dataList.push({ name: activ, response: res, index: i });
                return res;
            }
        }

    };

    this.DoIt = function (activ, i) {

        let items = this.actionList;
        for (var i in items) {
            let act = items[i];
            if (act.name == activ) {
                console.log("执行" + activ + "的绑定数据操作");
                this.Do(activ, act.data, i);
            }
        }


    }

    //通过行为与得到的数据绑定
    this.Bind = function (activ, func) {
        //获取数据列表
        let items = this.dataList;
        for (var i in items) {
            let act = items[i];
            if (act.name == activ) {
                console.log("生成动作 捕获动作数据:" + act, name);
                let data = act.response;
                try {
                    func(data);
                } catch (error) {
                    return error;
                }
                this.dataList.splice(i, 1);
                return true;
            }
        }


    }



    this.triggerRegister = function () {
        // 注册激活器事件
        let triggers = this.triggerList
        for (const i in triggers) {
            let trigger = triggers[i]
            $(trigger.name).on(trigger.event, function () {
                this.DoIt(trigger.action);
            });
        }

    }





    console.log("POS 初始化状态:↓");
    console.log(this instanceof POS);
}

function POSIni() {
    var pos = new POS();
    pos.triggerRegister();
    return pos;
}
// _posconfig.activeList = [];
//网站根URL
var pos = new POS();
pos.DoIt("login");

