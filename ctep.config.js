
    var config = {
        Host: "http://localhost:55810/",
        Api: "http://localhost:55810/api/",
    }
    var linkList = {
        Login: '/User/Login',
    }
   
    


 // // -----------------director路由库
    var author = function() {
        console.log("author");
    };
    var books = function() {
        console.log("books");
    };
    var viewBook = function(bookId) {
        console.log("viewBook: bookId is populated: " + bookId);
    };

var routes = {
    '/index': [books, function() {
        console.log("An inline route handler.");
    }],
    '/userlogin': [books, function() {
        console.log("An inline route handler.");
    }],
    '/register': [books, function() {
        console.log("An inline route handler.");
    }],
    '/manger': [books, function() {
        console.log("An inline route handler.");
    }],
    '/message': [books, function() {
        console.log("An inline route handler.");
    }],
    '/about': [books, function() {
        console.log("An inline route handler.");
    }],
    '/favorits': [books, function() {
        console.log("An inline route handler.");
    }],
    '/useredit': [books, function() {
        console.log("An inline route handler.");
    }],
    '/userexit': [books, function() {
        console.log("An inline route handler.");
    }],
    '/class': [books, function() {
        console.log("An inline route handler.");
    }],
    '/books/view/:bookId': viewBook
};

var router = Router(routes);

router.init();







var conManger = function() {}
conManger.postTo = function(data, urlName) {

    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.defaults.baseURL = config.Host;
    axios({
        method: 'post',
        url: urlName,
        data: data
    }).then(function(response) {

        if (response.data.AccountID > 0) {
//             userModal.log = true;
//             userModal.erro = false;
//             Account = response.data;
//              $('#userModal').modal('hide');
//             navTop.userInfo.name=Account.AccountName;
//             console.log(Account);
        } else {
//             userModal.erro = true;
//             console.log("登录失败！");
        }

    })
}
