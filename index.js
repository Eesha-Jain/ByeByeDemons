let express = require('express');
let app = express();

app.use('/css',express.static(__dirname +'/css'));
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile('/index.html', {root:'.'});
});

app.post('/getdemons', function (req, res) { 
  res.status(200).send(JSON.stringify({error: false, demons: true, demonWords: ["i"]}));
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log("Server ran!") 
});