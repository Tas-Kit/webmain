const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) => {
  console.log('Handling request', req);
  res.sendFile(path.join(__dirname, '/build/index.html'));
  console.log('Sending response', res);
});

app.listen(app.get('port'), () => {
  console.log(`Server Started at ${app.get('port')}`);
});
