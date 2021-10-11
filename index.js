let express = require('express');
let app = express();

app.use('/css',express.static(__dirname +'/css'));
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile('/index.html', {root:'.'});
});


app.post('/readDoc', (req, res) => {
  var dataToSend;
  const python = spawn('python', ['scripts.py', req.body.doc]);
  
  python.stdout.on('data', function (data) {
    dataToSend = data.toString();
  });

  python.on('close', (code) => {});
  res.status(200).send(JSON.stringify({data: dataToSend}));
});

app.get('/readDemons', async (req, res) => {
  const spawn = require('child_process').spawn;
  const pythonProcess = spawn('python', ['./demons.py']);

  pythonProcess.stdout.on('data', (data) => {
    return res.status(200).send(JSON.stringify({data: data.toString()}));
  });
});

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log("Server ran!") 
});