let express = require('express');
let app = express();
const spawn = require('child_process').spawn;
var mammoth = require("mammoth");
var multer = require('multer')

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './uploads/');
  },
  filename: function (request, file, callback) {
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
  //Get demon words
  const pythonProcess = await spawn('python', ['./python/demons.py']);

  await pythonProcess.stdout.on('data', async (data) => {
    var demons = data.toString();
    var arr = demons.split(", ");

    //Read uploaded doc
    var result=await mammoth.extractRawText({path: req.file.path});
    var text = result.value;
    var string = "";

    for (var d of arr) {
      var demon = d.split("'")[1];
      if (text.includes(" " + demon)) {
        string += demon + ", ";
      }
    }

    string = string.substring(0, string.length - 2);

    if (string.length > 0) {
    return res.send(
      `<html>
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width"/>
          <title>ByeByeDemons</title>
          <link href="css/style.css" rel="stylesheet" type="text/css" />

          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
          <link rel="icon" href="https://www.logolynx.com/images/logolynx/67/676d0c0b4913175891bd85ade24112ae.png"/>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap" rel="stylesheet"/>
        </head>
        <body>
          <div class="top">
            <h1>Bye Bye Demons</h1>
            <img src="https://www.logolynx.com/images/logolynx/67/676d0c0b4913175891bd85ade24112ae.png" width="50px" height="50px" />
            <br />
            <br />
            <h4>Upload your Word Document and Find Ms. Boness Demon Words</h4>
          </div>

          <div class="pageContent">
            <p style="color: red;">You have included demon words! This is what they are: </p>
            <p style="color: red;">${string}</p>
            <br />
            <br />
            <p style="font-size: 13px;">Warning: This program is not perfect and will find demon words within quotes. It also does not find demon words within hyphenated words such as full-time. It is your job to determine whether using a demon word is appropriate in your scenario.</p>
          </div>
          
          <div class="footer">
            <p>Created by Eesha Jain</p>
          </div>
        </body>
      </html>`
    );
    } else {
    return res.send(
      `<html>
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width"/>
          <title>ByeByeDemons</title>
          <link href="css/style.css" rel="stylesheet" type="text/css" />

          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
          <link rel="icon" href="https://www.logolynx.com/images/logolynx/67/676d0c0b4913175891bd85ade24112ae.png"/>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap" rel="stylesheet"/>
        </head>
        <body>
          <div class="top">
            <h1>Bye Bye Demons</h1>
            <img src="https://www.logolynx.com/images/logolynx/67/676d0c0b4913175891bd85ade24112ae.png" width="50px" height="50px" />
            <br />
            <br />
            <h4>Upload your Word Document and Find Ms. Boness Demon Words</h4>
          </div>

          <div class="pageContent">
            <p style="color: green;">Your paper is free of demon words! Great job!</p>
          </div>
          
          <div class="footer">
            <p>Created by Eesha Jain</p>
          </div>
        </body>
      </html>`
    );
    }
  });
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log("Server ran!") 
});