const bodyParser = require('body-parser');
var express = require('express');
var _ =require('underscore');

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
    var matchedTodo = _.findWhere(TODO, {id: todoId});
    
    if(matchedTodo){
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }
    res.send('Requesting todo with id of ' + req.params.id)
});


app.post('/TODO', function(req, res){
    var body =_.pick(req.body, 'description', 'completed');
    
    if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length ===0){
        return res.status(400).send();
    } // checkes if the todo is empty

    body.description = body.description.trim();
    body.id = TODOnextId++;
    TODO.push(body);
    res.json(body);
});

app.delete('/TODO/:id', function(req, res){
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(TODO, {id: todoId});

    if (!matchedTodo){
        res.status(404).json({"error": "No todo found with that id"});
    } else {
        TODO = _.without(TODO, matchedTodo);
        res.json(matchedTodo);
    }
})


app.put('/TODO/:id', function(req,res){
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(TODO, {id: todoId});
    var body =_.pick(req.body, 'description', 'completed');
    var validAttributes = {};

    // body.hasOwnProperty('completed')

    if (!matchedTodo) {
        return res.status(404).send();
    }
    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
        validAttributes.completed = body.completed;
    } else if (body.hasOwnProperty('completed')) {
        return res.status(400).send();
    };

    if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length < 0){
        validAttributes.description = body.description;
    } else if (body.hasOwnProperty('description')){
        return res.status(400).send();l
    }
    _.extend(matchedTodo, validAttributes);
    res.json(matchedTodo);
});
app.listen(PORT, function() {
    console.log('Express is listening to the port ' + PORT + '!')
});
