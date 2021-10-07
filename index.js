let express = require('express');
let app = express();
var path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

app.get('/', function (req, res) {
  res.sendFile('/index.html', {root:'.'});
});

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log("Server ran!") 
});