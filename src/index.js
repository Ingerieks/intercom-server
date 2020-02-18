
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/tracks/new', async (request, response) => {
  const tracks = await db.getTracks();
  
  response.json(tracks);
  
})

app.post('/tracks', async (req, res) => {
  const track = req.body;
  track.uploadDate = (new Date()).toISOString();
  const createdTrack = await db.createTrack(track);
  
  res.send(createdTrack);
})


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});
