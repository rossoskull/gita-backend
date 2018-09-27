if ( process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
var express = require('express');
var fetch = require('node-fetch');
var app = express();

var CLIENT_ID = process.env.CLIENT_ID;
var CLIENT_SEC = process.env.CLIENT_SEC;

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.redirect('http://rossoskull.me/gita');
});

app.get('/get_token', (request, response) => {
  const url = "https://bhagavadgita.io/auth/oauth/token";
  const options = {
    "client_id": CLIENT_ID,
    "cliend_secret": CLIENT_SEC,
    "grant_type": "client_credentials",
    "scope": "verse chapters"
  };

  fetch(url,{
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    body: `client_id=${CLIENT_ID}&client_secret=${CLIENT_SEC}&grant_type=client_credentials&scope=verse%20chapter`,
  })
  .then((res) => {
    res.json().then((data) => {
      response.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      response.send(data);
      response.end();
    });
  })
  .catch((err) => {
    response.send(err);
    response.end();
  });
});

var listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
