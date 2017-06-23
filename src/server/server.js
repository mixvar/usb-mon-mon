const express = require('express');

const app = express();
const staticRoot = __dirname;

app.set('port', (process.env.PORT || 3000));
app.use(express.static(staticRoot));

const serveContent = (process.env.STANDALONE_BACKEND)
  ? (response) => response.send('<h1>usb-mon-mon back running!</h1>')
  : (response) => response.sendFile('index.html');

app.get('/', (request, response) => {
  serveContent(response);
});

app.listen(app.get('port'), () => {
  console.log('usb-mon-mon running on port', app.get('port'));
});
