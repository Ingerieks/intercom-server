//import app from './server';

//app.listen(port, () => {
// console.log(`Your app is running on port ${port}`); // eslint-disable-line
// });

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = process.env.PORT || 3000;
//const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/tracks/new', (request, response) => {
  const tracks = db.getTracks();
  
  response.json([tracks]);
  
})

app.post('/tracks', (req, res) => {
  const track = req.body;
  track.uploadDate = (new Date()).toISOString();
  db.createTrack(track);

  res.send(track);
})



app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});