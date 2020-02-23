
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = process.env.PORT || 3000;

const cors = require('cors')

//middleware

app.use(cors())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/tracks/new', async (req, res) => {
  const tracks = await db.getTracks();
  console.log("GET /tracks/new", tracks)
  res.send(tracks);
  
})


//routes

app.post('/tracks', async (req, res) => {
  console.log(req.files); // the uploaded file object  
  const track = req.body;
  track.uploadDate = (new Date()).toISOString();
  const createdTrack = await db.createTrack(track);
  
  res.send(createdTrack);
})
 


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});
