'use strict';

//import app from './server';

//app.listen(port, () => {
// console.log(`Your app is running on port ${port}`); // eslint-disable-line
// });

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./queries');
var port = process.env.PORT || 3000;
//const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/tracks/new', function (request, response) {

  response.json([]);
});

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.listen(port, function () {
  console.log('App running on port ' + port + '.');
});
//# sourceMappingURL=index.js.map