const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
  req.url = req.url.replace('/web/main', '');
  next();
});


app.use(express.static(path.join(__dirname, '/build')));

app.use(express.static(path.join(__dirname, '/build/static')));

app.get('/healthcheck', (req, res) => {
  res.status(200).send('HEALTHY');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Server Started at ${app.get('port')}`);
});
