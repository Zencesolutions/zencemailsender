var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
app.use(bodyParser.json());
require('dotenv').config();
app.set('view engine', 'ejs');
const port = process.env.PORT || 3000;

var storage = multer.diskStorage({ 
    //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');


/** API path that will upload the files */
app.post('/upload', function(req, res) {
upload(req,res,function(err){
if(err){
 res.json({error_code:1,err_desc:err});
 return;
}
res.json({error_code:0,err_desc:null});
});
});
app.get('/',function(req,res){
    res.render("index");
});


app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});