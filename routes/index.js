var express = require('express');
var router = express.Router();
var fs = require('fs'); //文件操作
var app = express(); //创建web应用程序
var multer = require('multer'); //这是一个Node.js的中间件处理multipart/form-data
var upload = multer({ dest: 'E:/pixiv/static/img' }).any();
var upload2 = multer({ dest: 'E:/testpic/testpic/static/img' }).any();


var mysql = require('mysql');
var dbConfig = require('../db/dbconfig');
var customersql = require('../db/customersql');

//【设置路由使用的模块】
// 客户信息列表用模块
var findAllCustomers = require('../routes/findAllCustomers');
// 客户新增用模块
var addCustomerView = require('../routes/addCustomerView');
var addCustomerHandler = require('../routes/addCustomerHandler');
// 客户修改用模块
var editCustomerView = require('../routes/editCustomerView');
var editCustomerHandler = require('../routes/editCustomerHandler');
// 客户删除用模块
var deleteCustomerHandler = require('../routes/deleteCustomerHandler');
// 客户查询用模块
var searchCustomerHandler = require('../routes/searchCustomerHandler');
//图片上传模块
var addView = require('../routes/addView');
// var addPic = require('../routes/addPic');
var pool = mysql.createPool(dbConfig.mysql);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

//【设置路由】
// 路由：获取客户信息后，跳转至客户信息列表
router.get('/customer', findAllCustomers);
// 路由：跳转至客户新增页面
router.get('/customer/add', addCustomerView);
// 路由：执行客户新增后，跳转至客户信息列表
router.post('/customer/add', addCustomerHandler);
// 路由：跳转至客户修改页面
router.get('/customer/edit/:userid', editCustomerView);
// 路由：执行客户修改后，跳转至客户信息列表
router.post('/customer/edit/:userid', editCustomerHandler);
// 路由：执行客户删除后，跳转至客户信息列表
router.get('/customer/delete/:userid', deleteCustomerHandler);
// 路由：获取查询信息后，跳转至客户信息列表
router.post('/customer/search', searchCustomerHandler);
//路由：上传图片
router.get('/addView', addView);

//更新用户状态（封禁用户）
router.post('/updateUserStatus', upload, function (req, res, next) {
    pool.getConnection(function (error, connection) {
        connection.query(customersql.updateUserStatus, [req.body.status, req.body.userId], function (err, result) {
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});


//删除用户
router.post('/deleteUser', upload, function (req, res, next) {
    pool.getConnection(function (error, connection) {
        connection.query(customersql.deleteUser, [req.body.userId], function (err, result) {
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});

//删除插画
router.post('/deletePost', upload, function (req, res, next) {
    pool.getConnection(function (error, connection) {
        connection.query(customersql.deletePost, [req.body.postId], function (err, result) {
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});


//更新状态处理
router.post('/newRemind', upload, function (req, res, next) {
    pool.getConnection(function (error, connection) {
        connection.query(customersql.newRemind, [req.body.postId, req.body.userId], function (err, result) {
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});

router.post('/deleteRemind', upload, function (req, res, next) {
    pool.getConnection(function (error, connection) {
        connection.query(customersql.deleteRemind, [req.body.userId], function (err, result) {
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});
router.post('/allRemind', upload, function (req, res, next) {
    pool.getConnection(function (error, connection) {
        connection.query(customersql.allRemind, [req.body.userId], function (err, result) {
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});


//修改密码
router.post('/changePsw', upload, function (req, res, next) {
    pool.getConnection(function (error, connection) {
        connection.query(customersql.changePsw, [req.body.newPsw, req.body.userId], function (err, result) {
            if (err) throw (err);
            let re;
            if (result.length <= 0) { //修改失败
                re = {
                    whether: false
                }
            } else { //修改成功
                re = {
                    whether: true
                }
            }
            res.header("Access-Control-Allow-Origin", "*");
            res.json(re);
        });
    });
});

//用户取消点赞
router.post('/userDisThumb', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (error, connection) {
        // if (result.length === 0) {
        //     connection.query(customersql.insertUserThumb, [req.body.thumbNum, req.body.postId, req.body.userId], function (err, result) {
        //         connection.query(customersql.userThumb, [req.body.thumbNum, req.body.postId], function (err, result) {
        //             console.log(result);
        //         });
        //         console.log(result);
        //         if (err) throw (err);
        //         res.header("Access-Control-Allow-Origin", "*");
        //         res.json(result);
        //         connection.release();
        //     });
        // } else {
        connection.query(customersql.userDisThumb, [req.body.thumbNum, req.body.postId], function (err, result) {
            connection.query(customersql.deleteUserThumb, [req.body.postId, req.body.userId], function (err, result) {
            });
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
        // }
        connection.release();
    });
});
//更新userPost中的thumbNum
router.post('/updateThumb', upload, function (req, res, next) {
    pool.getConnection(function (error, connection) {
        connection.query(customersql.updateThumb, [req.body.thumbNum, req.body.postId], function (err, result) {
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});
//用户点赞
router.post('/userThumb', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (error, connection) {
        connection.query(customersql.queryThumb, [req.body.postId, req.body.userId], function (err, result) {
            if (result.length === 0) {
                connection.query(customersql.insertUserThumb, [req.body.thumbNum, req.body.postId, req.body.userId], function (err, result) {
                    connection.query(customersql.userThumb, [req.body.thumbNum, req.body.postId], function (err, result) {
                        if (err) throw (err);
                        res.header("Access-Control-Allow-Origin", "*");
                        res.json(result);
                    });
                });
            } else {
                connection.query(customersql.userThumb, [req.body.thumbNum, req.body.postId], function (err, result) {
                    if (err) throw (err);
                    res.header("Access-Control-Allow-Origin", "*");
                    res.json(result);
                });
            }
        });
        connection.release();
    });
});
//获取插画的点赞数
router.post('/getThumbNum', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (error, connection) {
        var param = req.body;
        connection.query(customersql.getThumbNum, [param.postId], function (err, result) {
            connection.release();
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});
//获取？
router.post('/getUserThumbInfo', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (error, connection) {
        var param = req.body;
        connection.query(customersql.getUserThumbInfo, [param.userId], function (err, result) {
            connection.release();
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});
//根据id值获取插画的详细信息
router.post('/getPostById', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (error, connection) {
        var param = req.body;
        connection.query(customersql.getPostById, [param.postId], function (err, result) {
            connection.release();
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});
//获取用户发布的插画
router.post('/getUserPost', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (error, connection) {
        var param = req.body;
        connection.query(customersql.getUserPost, [param.userId], function (err, result) {
            connection.release();
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});
//获取用户收藏的插画
router.post('/getUserCollect', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (error, connection) {
        var param = req.body;
        connection.query(customersql.getUserCollect, [param.userId], function (err, result) {
            connection.release();
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});
//搜索
router.post('/search', upload, function (req, res, next) {
    pool.getConnection(function (error, connection) {
        var param = req.body;
        var arrUser = {};
        var arrTitle = {};
        connection.query(customersql.searchByUserName, ['%' + param.searchInput + '%'], function (err, result) {
            if (err) throw (err);
            arrUser = result;
            connection.query(customersql.searchByPostTitle, ['%' + param.searchInput + '%'], function (err, result) {
                if (err) throw (err);
                arrTitle = result;
                let arr = [];
                arr.push(arrUser);
                arr.push(arrTitle);
                res.header("Access-Control-Allow-Origin", "*");
                res.json(arr);
            });
        });
        connection.release();

        // connection.query(customersql.search, ['%' + param.searchInput + '%', '%' + param.searchInput + '%'], function (err, result) {
        //     connection.release();
        //     if (err) throw (err);
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.json(result);
        // });
    });
});
//取消用户喜欢（现在变成关注可好？）
router.post('/deleteUserLike', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (error, connection) {
        var param = req.body;
        connection.query(customersql.deleteUserLike, [param.userId, param.beFollowedUserId], function (err, result) {
            connection.release();
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});
router.post('/userLike', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (error, connection) {
        var param = req.body;
        connection.query(customersql.userLike, [param.userId, param.beFollowedUserId], function (err, result) {
            connection.release();
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});
router.post('/getUserBeLikeInfo', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (error, connection) {
        var param = req.body;
        connection.query(customersql.getUserBeLikeInfo, [param.userId], function (err, result) {
            connection.release();
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});
router.post('/getUserLikeInfo', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (error, connection) {
        var param = req.body;
        connection.query(customersql.getUserLikeInfo, [param.userId], function (err, result) {
            connection.release();
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});
router.post('/deleteAddCollect', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (error, connection) {
        var param = req.body;
        connection.query(customersql.deleteAddCollect, [param.userId, param.postId], function (err, result) {
            connection.release();
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});
router.post('/userAddCollect', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (error, connection) {
        var param = req.body;
        connection.query(customersql.userAddCollect, [param.userId, param.postId], function (err, result) {
            connection.release();
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});
router.post('/getCollectInfo', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (error, connection) {
        var param = req.body;
        connection.query(customersql.getCollectInfo, [param.userId], function (err, result) {
            connection.release();
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});

router.post('/deleteComment', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (error, connection) {
        var param = req.body;
        connection.query(customersql.deleteComment, [req.body.commentId], function (err, result) {
            connection.release();
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});

router.post('/addComment', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (error, connection) {
        var param = req.body;
        connection.query(customersql.addComment, [param.userId, param.postId, param.commentDate, param.commentDetail, param.headImg, param.userName], function (err, result) {
            connection.release();
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});

//获取所有评论
router.get('/getAllComments', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query(customersql.getAllComments, function (err, result) {
            connection.release();
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});

router.post('/getCommentByPostId', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (error, connection) {
        var param = req.body;
        connection.query(customersql.getCommentByPostId, [param.postId], function (err, result) {
            connection.release();
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        })
    });
});
router.post('/getUserById', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (error, connection) {
        var param = req.body;
        connection.query(customersql.getUserById, [param.userId], function (err, result) {
            connection.release();
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});
router.get('/selectAllUser', function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (err, connection) {
        connection.query(customersql.selectAllUser, function (err, result) {
            connection.release();
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
    });
});
router.get('/getAllThumbNum', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query(customersql.getAllThumbNum, function (err, result) {
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
        connection.release();
    });
});
router.get('/selectAllPost', function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (err, connection) {
        connection.query(customersql.selectAllPost, function (err, result) {
            if (err) throw (err);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        });
        connection.release();
    });
});
router.post('/updateUserInfo', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (err, connection) {
        console.log(req);
        var param;
        var we;
        var info;
        if (req.body.uploadType === '0') {
            param = {
                userName: req.body.userName,
                // password = req.body.password,
                email: req.body.email,
                mobile: req.body.mobile,
                sex: req.body.sex,
                headImg: req.body.headImg,
                userIntroduction: req.body.userIntroduction
            };
            connection.query(customersql.update, [param, req.body.userId], function (err, result) {
                connection.release();
                if (result.affectedRows !== 0) {
                    we = true;
                } else {
                    we = false;
                }
                info = {
                    we: we,
                    showPath: req.body.headImg
                }
                res.header("Access-Control-Allow-Origin", "*");
                res.json(info);
            });
        } else {
            var filePath = "E:/pixiv/static/img/" + req.files[0].originalname;
            var showPath = "../../../../static/img/" + req.files[0].originalname;
            param = {
                userName: req.body.userName,
                // password = req.body.password,
                email: req.body.email,
                mobile: req.body.mobile,
                sex: req.body.sex,
                headImg: showPath,
                userIntroduction: req.body.userIntroduction
            };
            var files = req.files[0];
            fs.renameSync(req.files[0].path, filePath);
            connection.query(customersql.update, [param, req.body.userId], function (err, result) {
                connection.query(customersql.updateHeadImgInComments, [showPath, req.body.userId], function (err, result) {
                    if (err) throw (err);
                });
                if (files.mimetype !== 'image/gif' || files.mimetype !== 'image/jpeg' || files.mimetype !== 'image/png') {
                    if (result.affectedRows !== 0) {
                        we = true;
                    } else {
                        we = false;
                    }
                } else {
                    we = false;
                }
                info = {
                    we: we,
                    showPath: showPath
                }
                connection.release();
                res.header("Access-Control-Allow-Origin", "*");
                res.json(info);
            });
        }
    });
});
//用户上传图片（包括多图片上传）
router.post('/postImg', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    var param;
    for (var i = 0; i < req.files.length; i++) {
        // var filePath = "E:/pixiv/static/img/" + req.files[i].originalname;
        // // var filePath2 = "E:/testpic" + req.files[i].originalname;
        // var showPath = "../../../../static/img/" + req.files[i].originalname;
        // // console.log(req.files[i].path);
        // // console.log(filePath);
        // fs.renameSync(req.files[i].path, filePath);
        // // fs.renameSync(req.files[i].path, filePath2);
        var filePath = "E:/pixiv/static/img/" + req.files[i].originalname;
        var showPath = "../../../../static/img/" + req.files[i].originalname;
        var num = 0;
        param = {
            userId: req.body.userId,
            // password = req.body.password,
            userName: req.body.userName,
            postId: req.body.postId,
            postDate: req.body.postDate,
            postText: req.body.postText,
            postTitle: req.body.postTitle
        };
        var files = req.files[i];
        fs.renameSync(req.files[i].path, filePath);
        pool.getConnection(function (err, connection) {
            var param = req.body;
            var we;
            connection.query(customersql.postImg, [param.userId, param.userName, param.postId, showPath, param.postDate, param.postText, param.postTitle, num], function (err, result) {
                if (err) throw (err);
            });
            // if (files.mimetype !== 'image/gif' || files.mimetype !== 'image/jpeg' || files.mimetype !== 'image/png') {
            //     // if (result.affectedRows !== 0) {
            //     we = true;
            //     // } else {
            //     //     we = false;
            //     // }
            // } else {
            //     we = false;
            // }
            res.header("Access-Control-Allow-Origin", "*");
            res.json(we);
        });
    }
    // }
});

//把用户上传的图片推到隐藏路径~
router.post('/add5', upload2, function (req, res, next) {
    var filePath = "E:/testpic/testpic/static/img/" + req.files[0].originalname;
    fs.renameSync(req.files[0].path, filePath);
});

router.post('/userNameExist', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (err, connection) {
        var param = req.body;
        var we;
        connection.query(customersql.queryByUsername, [param.username], function (err, result) {
            connection.release();
            if (result.length <= 0) {
                we = true; //当账户名不存在时返回true，表示该账户名可用
            }
            if (result.length === 1) {
                we = false; //当账户名存在时返回false，表示该账户名不可用
            }
            res.header("Access-Control-Allow-Origin", "*");
            res.json(we);
        });
    });
});
//用户登陆用接口
router.post('/userLogin', upload, function (req, res, next) {
    // var pool = mysql.createPool(dbConfig.mysql);
    pool.getConnection(function (err, connection) {
        var param = req.body;
        var we;
        var re = {};
        connection.query(customersql.queryUser, [param.username, param.password], function (err, result) {
            connection.release();
            var r = result[0];
            if (result.length <= 0) {
                // we = { we: false }; //账号或密码错误
                we = false;
                re = {
                    whether: we
                }
            }
            if (result.length === 1) {
                // we = { we: true }; //登陆成功
                we = true;
                re = {
                    result: r,
                    whether: we
                }
            }
            // var a = JSON.stringify(re);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(re);
        })
    });
});
router.post('/add4', upload2, function (req, res, next) {
    var filePath = "E:/testpic/testpic/static/img/" + req.files[0].originalname;
    fs.renameSync(req.files[0].path, filePath);
});
router.post('/add3', upload, function (req, res, next) {
    if (req.files == undefined) {
        res.json('undefined');
    } else {
        var showPath;
        var myFollower = 0;
        var status = 'true';
        // var pool = mysql.createPool(dbConfig.mysql);
        if ((req.files).length <= 0) { //当没图片上传时
            showPath = '';
            pool.getConnection(function (err, connection) {
                var param = req.body;
                param.sex = '';
                // console.log(param.sex);
                var we;
                connection.query(customersql.insert, [param.username, param.password, param.email, param.mobile, param.sex, showPath, param.intro, myFollower, status], function (err, result) {
                    connection.release();
                    if (err) throw (err);
                    if (result) {
                        we = true;
                    } else {
                        we = false;
                    }
                    res.header("Access-Control-Allow-Origin", "*");
                    res.json(we);
                });
            });
        } else {
            for (var i = 0; i < req.files.length; i++) {
                var filePath = "E:/pixiv/static/img" + req.files[i].originalname;
                // var filePath2 = "E:/testpic" + req.files[i].originalname;
                var showPath = "../../../../static/" + req.files[i].originalname;
                fs.renameSync(req.files[i].path, filePath);
                // fs.renameSync(req.files[i].path, filePath2);

                pool.getConnection(function (err, connection) {
                    var param = req.body;
                    var we;
                    connection.query(customersql.insert, [param.username, param.password, param.email, param.mobile, param.sex, showPath, param.intro, myFollower, status], function (err, result) {
                        if (result) {
                            we = true;
                        } else {
                            we = false;
                        }
                        res.header("Access-Control-Allow-Origin", "*");
                        res.json(we);
                    });
                });
            }
        }
    }
});



//多图片上传看这里
// for (var i = 0; i < req.files.length; i++) {
//     var filePath = "E:/YNET/dou/dou/static/" + req.files[i].originalname;
//     var showPath = "../../../../static/" + req.files[i].originalname;
//     console.log(req.files[i].path);
//     console.log(filePath);
//     fs.renameSync(req.files[i].path, filePath);

//     var pool = mysql.createPool(dbConfig.mysql);
//     pool.getConnection(function (err, connection) {
//         // console.log(req.body);
//         // console.log(req.files[0].originalname);
//         // console.log(req.files[0].fieldname);
//         // console.log(req.files[0].encoding);
//         // console.log(req.files[0].mimetype);
//         var param = req.body;
//         var we;
//         connection.query(customersql.insert, [param.username, param.password, param.email, param.mobile, param.sex, showPath], function (err, result) {
//             connection.release();
//             console.log(result);
//             if (result) {
//                 we = true;
//             } else {
//                 we = false;
//             }
//             console.log(we);
//             res.header("Access-Control-Allow-Origin", "*");
//             res.json(we);
//         });
//     });
// }

// router.post('/add', upload.array("file"), function (req, res, next) {
//     var string = [];
//     if (req.files == undefined) {
//         // res.send("请选择要上传的图片...");
//         res.json('undefined');
//     } else {
//         for (var i = 0; i < req.files.length; i++) {
//             // var filepath = __dirname + "/../tmp/"+req.files[i].originalname;
//             var filepath = "E:/YNET/dou/dou/static/" + req.files[i].originalname;//图片储存的绝对路径
//             var showPath = "../../../../static/" + req.files[i].originalname;//传递到vue中的相对路径
//             // var filepath = '';
//             console.log(__dirname);
//             console.log(req.files[i].originalname);
//             fs.renameSync(req.files[i].path, filepath);
//             console.log(filepath);
//             console.log(showPath);
//             // res.json(filepath);

//             var pool = mysql.createPool(dbConfig.mysql);
//             pool.getConnection(function (err, connection) {
//                 var param = req.body;
//                 console.log(req.body);
//                 var we;
//                 connection.query(customersql.insert, [param.username, param.password, param.email, param.mobile, showPath], function (err, result) {
//                     connection.release();
//                     if (result) {
//                         we = true;
//                     } else {
//                         we = false;
//                     }
//                     res.header("Access-Control-Allow-Origin", "*");
//                     res.json(we);
//                 });
//             });
//         }
//     }
// });
module.exports = router;