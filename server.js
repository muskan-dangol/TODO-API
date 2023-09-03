const bodyParser = require('body-parser');
var express = require('express');

var app = express();
var PORT = process.env.PORT || 3000;
var TODO = []
var TODOnextId = 1;

app.use(bodyParser.json()); //lets set up middleware

app.get('/', function(req, res) {
    res.send('Root Api to TODO app');
});


app.get('/TODO', function (req, res) {
    res.json(TODO);
});

app.get('/TODO/:id', function(req, res) {
    var todoId = parseInt(req.params.id, 10); //req params are always a string.
    var matchedTodo;
    TODO.forEach(function(todo){
        if(todoId === todo.id) {
            matchedTodo = todo;
        }
    });
    if(matchedTodo){
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }
    res.send('Requesting todo with id of ' + req.params.id)
});


app.post('/TODO', function(req, res){
    var body = req.body;
    body.id = TODOnextId++;
    TODO.push(body);
    res.json(body);
});

app.listen(PORT, function() {
    console.log('Express is listening to the port ' + PORT + '!')
});
