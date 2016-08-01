var express = require('express');
var app = express();
var db = require('./db.js');
var hbs = require('hbs');
var bodyParser = require('body-parser');

app.set('view engine', 'hbs');  // 用hbs作为模版引擎
app.set('views', __dirname + '/views'); // 模版所在路径

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));//配置静态资源文件



//添加一位用户
app.get('/', function(req, res) {
	res.render('index');
})
app.get('/write', function(req, res) {
	res.render('write');
})
app.get('/article/:shareStr', function(req, res) {	
	db.selectArticle({shareStr:req.params.shareStr},function(article){
		console.log('select: ' + JSON.stringify(article));
		console.log(article.title + '---' + article.content);
		res.render('view',article);		
	});
})
app.post('/new_article', function(req, res) {
	var str = "";

	str = generateStr();
	console.log('生成随机字符串');
	db.newArticle({shareStr:str,title:req.body.title,content:req.body.content});				
	res.send(str);
	//res.render('view',{'title':'sd','content':'sdsss'});
})


//处理404
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
//处理500
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
//创建server
var server = app.listen(80, function() {
	var host = server.address().address
	var port = server.address().port
	console.log(" app listening at http://%s:%s", host, port)

});


function generateStr(){
	var dataArr = new Array();
	for(var i=0;i<26;i++){
		dataArr.push(String.fromCharCode('A'.charCodeAt() + i));
	}
	for(var i=0;i<10;i++){
		dataArr.push(i+'');
	}
	var str = "";
	var n = "";
	for(var i = 0;i<8;i++){
		n =dataArr[parseInt(Math.random()*35-1)];
		str += n;
	}
	return str;
}