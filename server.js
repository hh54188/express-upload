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
		cb(null, false);
	}
})

app.use(express.static('public'));
app.post('/upload/',  upload.single('stuff'), function (req, res) {
	res.send("Hello World");
})
app.listen(80);