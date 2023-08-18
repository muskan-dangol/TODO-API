var express = require('express');

var app = express();
var PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.send('Root Api to TODO app');
});

app.listen(PORT, function() {
    console.log('Express is listening to the port ' + PORT + '!')
})