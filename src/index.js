
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const port = process.env.PORT || 3000;
const fileUpload = require('express-fileupload');
const cors = require('cors');
import { v4 as uuidv4 } from 'uuid';
 

//middleware

app.use(fileUpload({debug: true}));

app.use(cors())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//routes

app.get('/tracks/new', async (req, res) => {
  const tracks = await db.getTracks();
  console.log("GET /tracks/new", tracks)
  res.send(tracks);
  
})

app.post('/tracks', async (req, res) => {
  console.log(req.files, "files"); // the uploaded file object 
  const filePath = `${process.env.FILES}/${uuidv4()}`; 
  req.files.audio.mv(filePath);

  const track = { 
    uploadDate: (new Date()).toISOString(),
    path: filePath, 
  };
  track.uploadDate = (new Date()).toISOString();
  const createdTrack = await db.createTrack(track);
  
  res.send(createdTrack);
})
 


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});
