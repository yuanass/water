// 【客户管理模块用SQL语句】对象
var customerSQL = {
    // 列表展现用
    queryAll: 'SELECT * FROM userInfo', //获取全部用户信息
    selectAllPost: 'SELECT * FROM userpost ORDER BY id', //获取全部插画
    selectAllUser: 'SELECT * FROM userinfo',
    getCollectInfo: 'SELECT * FROM usercollect WHERE userId = ?', //获取用户信息
    getUserLikeInfo: 'SELECT * FROM userlike WHERE userId = ?', //获取用户关注其他用户的信息
    getUserBeLikeInfo: 'SELECT * FROM userlike WHERE beFollowedUserId = ?', //获取用户被其他用户关注的信息
    getUserCollect: 'SELECT * FROM usercollect WHERE userId = ?', //获取用户收藏
    getPostById: 'SELECT * FROM userpost WHERE postId = ?', //根据插画id查找该插画信息
    getUserThumbInfo: 'SELECT * FROM userthumb WHERE userId = ?', //判断用户有没有点赞
    getThumbNum: 'SELECT thumbNum FROM userthumb WHERE postId = ?', //获取该插画的点赞数
    getAllThumbNum: 'SELECT * FROM userthumb', //获取点赞数
    getUserPost: 'SELECT * FROM userpost WHERE userId = ?', //根据用户id查找该用户发布的插画

    // 客户新增用
    insert: 'INSERT INTO userInfo VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    insert2: 'INSERT INTO userInfo VALUES(NULL, ?, ?, ?, ?)', //用户注册？
    addComment: 'INSERT INTO usercomments VALUES(NULL, ?, ?, ?, ?, ?, ?)', //用户添加评论
    userAddCollect: 'INSERT INTO usercollect VALUES(NULL, ?, ?)', //用户添加收藏
    userLike: 'INSERT INTO userlike VALUES(NULL, ?, ?)', //用户关注
    postImg: 'INSERT INTO userpost VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?)', //用户发布插画

    //动态更新部分
    newRemind: 'INSERT INTO remind VALUES(NULL, ?, ?)', //用户关注对象更新表(插入数据)
    deleteRemind: 'DELETE FROM remind WHERE userId = ?', //删除该动态更新提醒信息
    allRemind: 'SELECT * FROM remind WHERE userId = ?', //遍历所有新发布的内容

    // 客户修改用
    updateThumb: 'UPDATE userpost SET thumbNum = ? WHERE postId = ?',
    getUserById: 'SELECT * FROM userInfo WHERE userId = ?',
    getCommentByPostId: 'SELECT * FROM usercomments WHERE postId = ?',
    getAllComments: 'SELECT * FROM usercomments', //select所有的评论
    update: 'UPDATE userinfo SET ? WHERE userid = ?',
    userThumb: 'UPDATE userthumb SET thumbNum = ? WHERE postId = ?', //用户点赞
    queryThumb: 'SELECT * FROM userThumb WHERE postId = ? AND userId = ?', //查询数据库中有没有用户为该插画点赞的记录    
    insertUserThumb: 'INSERT INTO userThumb VALUES(NULL, ?, ?, ?)', //当用户为没被用户点过赞的插画点赞时在点赞表中插入该插画的点赞数据
    userDisThumb: 'UPDATE userthumb SET thumbNum = ? WHERE postId = ?',
    deleteUserThumb: 'DELETE FROM userThumb WHERE postId = ? AND userId = ?', //当取消点赞的用户是最后一位用户时，删除这位用户的点赞记录
    updateHeadImgInComments: 'UPDATE usercomments SET headImg = ? WHERE userId = ?',
    changePsw: 'UPDATE userinfo SET password = ? WHERE userId = ?', //修改用户密码
    updateUserStatus: 'UPDATE userinfo SET status = ? WHERE userId = ?', //修改用户的状态

    // 客户删除用
    delete: 'DELETE FROM userInfo WHERE userid = ?',
    deleteAddCollect: 'DELETE FROM usercollect WHERE userId = ? AND postId = ?', //删除用户收藏
    deleteUserLike: 'DELETE FROM userLIKE WHERE userId = ? AND beFollowedUserId = ?', //删除用户点赞
    deleteUser: 'DELETE FROM userinfo WHERE userId = ?', //管理员删除用户
    deletePost: 'DELETE FROM userpost WHERE postId = ?', //管理员删除插画
    deleteComment: 'DELETE FROM usercomments WHERE id = ?', //管理员删除评论

    // 条件查询用
    //实现登陆，查询用户的账号和密码
    queryUser: 'SELECT * FROM userInfo WHERE username LIKE ? AND password LIKE ?',

    //查询用户和标题
    search: 'SELECT * FROM userpost WHERE userName LIKE ? OR postTitle LIKE ?',
    searchByUserName: 'SELECT * FROM userinfo WHERE userName LIKE ? ',
    searchByPostTitle: 'SELECT * FROM userpost WHERE postTitle LIKE ?',

    //查询账户名是否存在
    queryByUsername: 'SELECT * FROM userInfo WHERE username LIKE ?',
    queryByPassword: 'SELECT * FROM userInfo WHERE password LIKE ?',
    queryByEmail: 'SELECT * FROM userInfo WHERE email LIKE ?',
    queryByMobile: 'SELECT * FROM userInfo WHERE mobile LIKE ?'
};

// 【客户管理模块用SQL语句】对象模块
module.exports = customerSQL;