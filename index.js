let express = require('express');
let app = express();
const spawn = require('child_process').spawn;
var mammoth = require("mammoth");
var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        console.log(file);
        callback(null, './uploads/');
    },
    filename: function (request, file, callback) {
        console.log(file);
        callback(null, "uploaded")
    }
});

var upload = multer({ storage: storage });

app.use('/css',express.static(__dirname +'/css'));
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile('/index.html', {root:'.'});
});

app.post('/fileupload', upload.single('avatar'), async function (req, res, next) {
  var demons;
  var text;

  //Get demon words
  const pythonProcess = await spawn('python', ['./python/demons.py']);

  await pythonProcess.stdout.on('data', (data) => {
    demons = data.toString();
  });

  //Read uploaded doc
  await mammoth.extractRawText({path: req.file.path}).then(function(result) {
    text = result.value;
  }).done();

  //Return
  return res.status(200).send(JSON.stringify({demon: demons, docContent: text}))
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log("Server ran!") 
});