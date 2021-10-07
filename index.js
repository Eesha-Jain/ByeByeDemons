let express = require('express');
let app = express();

app.use('/css',express.static(__dirname +'/css'));
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile('/index.html', {root:'.'});
});

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log("Server ran!") 
});