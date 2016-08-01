var express = require('express');
var multer  = require('multer');
var app = express();

var storage = multer.diskStorage({
	destination: './uploads/',
	filename: function (req, file, callback) {
		callback(null, file.originalname);
	}
})

var upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		console.log(file);
		cb(null, true);
	}
})

app.use(express.static('public'));

app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
  	next();
});

app.post('/upload/', upload.single('stuff'), function (req, res) {
	console.log(res);
	console.log(res.file);
	res.send({
		status: 200
	});
})
app.listen(80);