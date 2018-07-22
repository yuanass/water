var express = require('express');
var fs=require('fs'); //文件操作
var app=express(); //创建web应用程序
var multer=require('multer'); //这是一个Node.js的中间件处理multipart/form-data
var upload=multer({dest:'./tmp'});


app.get('/addPic.ejs',function (req,res) {
    res.sendfile(__dirname+'/'+'addPic.ejs');
});

app.post('/add', upload.array("file"), function(req, res, next){
    if(req.files==undefined){
        res.send("请选择要上传的图片...");
    }else{
        var str="文件上传成功...";
        for(var i=0;i<req.files.length;i++){
            var filepath = __dirname + "/tmp/" + req.files[i].originalname;
            fs.renameSync(req.files[i].path,filepath);
        }
        res.send("上传的图片成功...");
        // console.log(req.filepath);
    }
});

module.exports = function(req,res,next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.json('test');
    upload.array("file");
    // console.log(req.files);
    res.json(req.files);
    // for(var i=0;i<req.files.length;i++) {
    //     var filepath = __dirname + "/tmp/" + req.files[i].originalname;
    //     fs.renameSync(req.files[i].path,filepath);
    // }
    // res.json(req.filepath);
};