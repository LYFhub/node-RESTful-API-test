var express = require('express');
var app = express();
var fs = require('fs');

// 获取用户列表
app.get('/listUsers', function(req, res) {
	fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err, data) {
		console.log(data);
		res.end(data);
	});
})

// 添加用户

var user4 = {
	'user4': {
		"name": "mohit",
		"password": "password4",
		"profession": "teacher",
		"id": 4
	}
}
app.get('/adduser', function(req, res) {
	fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err, data) {
		// console.log(data);
		var user = JSON.parse(data);
		user['user4'] = user4['user4'];
		console.log(user);
		res.end(JSON.stringify(user));

		fs.writeFile(__dirname + '/' + 'users.json', JSON.stringify(user), 'utf8', function(err) {
			if (err) {
				console.log(err);
			}

			console.log("数据写入成功！");
			console.log("--------我是分割线-------------")
			console.log("读取写入的数据！");
			fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err, data) {
				if (err) {
					return console.error(err);
				}
				console.log("异步读取文件数据: " + data);
			});
		});
	});
})


// 查看单个用户详细信息
app.get('/:id', function(req, res) {
	// 首先我们读取已存在的用户
	fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data) {
		if (err) {
			console.log(err);
			res.end(err);
		}

		data = JSON.parse(data);
		var user = data["user" + req.params.id]
		console.log(user);
		res.end(JSON.stringify(user));
	});
})

// 删除用户
app.get('/deleteuser', function() {
	//
})

var server = app.listen(8081, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('应用实例，访问地址为 http://%s:%s', host, port);
})