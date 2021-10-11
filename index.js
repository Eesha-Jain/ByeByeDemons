let express = require('express');
let app = express();
var multer = require('multer');
const spawn = require('child_process').spawn;

app.use('/css',express.static(__dirname +'/css'));
app.use(express.json());

//Storage and upload are modified from https://www.geeksforgeeks.org/file-uploading-in-node-js/
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    cb(null, "uploaded.docx")
  }
})

var upload = multer({ 
  storage: storage 
}).single("doc");

app.get('/', function (req, res) {
  res.sendFile('/index.html', {root:'.'});
});

app.post('/fileupload', async (req, res) => {
  //Convert into word document in server
  await upload(req, res, function(err) {})

  //Get demon words
  const pythonProcess = await spawn('python', ['./python/demons.py']);
  var demons;

  await pythonProcess.stdout.on('data', (data) => {
    console.log("1: " + data.toString());
    demons = data.toString();
  });

  console.log("2: " + demons);

  //Read uploaded doc
  const pyProcess = await spawn('python', ['./python/scripts.py']);
  var docContents;

  console.log("3: " + docContents);

  await pyProcess.stdout.on('data', (data) => {
    console.log("4: " + data.toString());
    docContents = data.toString();
  });

  console.log("5 output");

  //Return
  //return res.status(200).send(JSON.stringify({demon: demons, docContent: docContents}))
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log("Server ran!") 
});