
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
app.use('/tracks/file', express.static(process.env.FILES));
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//routes

app.get('/tracks/new', async (req, res) => {
  const dbTracks = await db.getTracks();
  const tracks = dbTracks.map(track => {
    return { 
      uploadDate: track.upload_date,
      url: `/tracks/file/${track.file_name}`
    }
  });
  console.log("GET /tracks/new", tracks)
  res.send(tracks);
  
})

app.post('/tracks', async (req, res) => {
  console.log(req.files, "files"); // the uploaded file object 
  const fileName = uuidv4(); 
  const filePath = `${process.env.FILES}/${fileName}`; 

  req.files.audio.mv(filePath);

  const track = { 
    uploadDate: (new Date()).toISOString(),
    fileName: fileName, 
  };
  track.uploadDate = (new Date()).toISOString();
  const createdTrack = await db.createTrack(track);
  
  res.send(createdTrack);
})
 


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});
