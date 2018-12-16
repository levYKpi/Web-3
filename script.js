var express = require("express");
var app     = express();
var path    = require("path");
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.static('docs'));


app.get('/',function(req,res){
    res.sendFile(path.resolve('./docs/index.html'));
});


app.get('/api', function (req, res) {
    switch(req.query['task']) {
        case 'add': {
            console.log('ADD request for ' + req.query.query);
            var data = JSON.parse(req.query.query);
            res.cookie(data.name, data.value, { maxAge: Date.parse(data.expires)});
            break;
        }
        case 'rm': {
            console.log('RM request for ' + req.query.query);
            res.clearCookie(req.query.query);
            break;
        }
    }
    res.end();
});

app.listen(228);

console.log("Running at localhost:228");
