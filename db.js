var mongoClient = require('mongodb').MongoClient;
var conn_str = 'mongodb://localhost:27017/echo';
var collectionName = 'article';
var db;
// var Schema = mongoose.Schema;   //  创建模型
// var articleScheMa = new Schema({
// 	title: String,
// 	content: String,
// 	shareStr: String
// }); //  定义了一个新的模型，但是此模式还未和article集合有关联
// exports.article = db.model('article', articleScheMa); //  与article集合关联


// Insert Letter
exports.newArticle = function(data,callback) {

	connect_db(function(err,db){
		this.db = db;
		var collection = db.collection(collectionName);
		collection.insert(data,function(err,result){
			if (err) {
				console.log('Error:' + err);
				return;
			}
			db.close();
			if (callback != null) {
				callback();
			}
		});
	});
	
};

// Select Letter
exports.selectArticle = function(whereStr,callback) {  

	connect_db(function(err,db){
		//连接到表  
		var collection = db.collection(collectionName);
		collection.find(whereStr).toArray(function(err, result) {
			if(err){
				console.log('Error:'+ err);
				return;
			}
			callback(result[0]);
			db.close();
		});		
	});
	
}
//指定分享url是否存在
exports.exist = function(whereStr,callback){
	connect_db(function(err,db){
		//连接到表  
		var collection = db.collection(collectionName);
		collection.find(whereStr).toArray(function(err, result) {
			if(err){
				console.log('Error:'+ err);
				return;
			}     
			db.close();
			if (result.length > 0) {
				callback(true);
			}else{
				callback(false);
			}
		});		
	});
}
//链接数据库
function connect_db(callback){
	mongoClient.connect(conn_str,function(err,db){
		callback(err,db);
	});
}






/**

//更新数据
  var whereStr = {"name":'wilson001'};
  var updateStr = {$set: { "age" : 100 }};
  collection.update(whereStr,updateStr, function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }	 
    callback(result);
  });

  var delData = function(db, callback) {  
  //连接到表  
  var collection = db.collection('tb2');
  //删除数据
  var whereStr = {"name":'wilson001'};
  collection.remove(whereStr, function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}


*/