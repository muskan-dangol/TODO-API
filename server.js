var express = require('express');

var app = express();
var PORT = process.env.PORT || 3000;
var TODO = [{
    id: 1, 
    description: 'Meet mum for lunch',
    completed: false
}, {
    id:2, 
    description: 'go shopping',
    completed: false
}, {
    id:3, 
    description: 'do laundry in the evening!',
    completed: true
}]


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


app.listen(PORT, function() {
    console.log('Express is listening to the port ' + PORT + '!')
});
