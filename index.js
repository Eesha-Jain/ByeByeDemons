let express = require('express');
let app = express();

app.use('/css',express.static(__dirname +'/css'));
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile('/index.html', {root:'.'});
});

app.get('/readDemons', async (req, res) => {
  const spawn = require('child_process').spawn;
  const pythonProcess = spawn('python', ['./python/demons.py']);

  pythonProcess.stdout.on('data', (data) => {
    return res.status(200).send(JSON.stringify({data: data.toString()}));
  });
});

app.get('/readDoc', (req, res) => {
  const spawn = require('child_process').spawn;
  const pythonProcess = spawn('python', ['./python/scripts.py']);

  console.log("inside");

  pythonProcess.stdout.on('data', (data) => {
    return res.status(200).send(JSON.stringify({data: data.toString()}));
  });
});

app.get('/fileupload', (req, res) => {
  console.log("number2")

  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
    var newpath = "uploaded.docx";
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.write('File uploaded and moved!');
      res.end();
    });
 });
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log("Server ran!") 
});