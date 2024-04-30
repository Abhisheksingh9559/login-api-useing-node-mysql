const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const routes = require('./routes');
app.use(express.json());
app.use(cors());

 // Set our api routes
 app.use(routes);

app.get('/api', (req, res) => {
    console.log('start');
    res.send('Hello, API!');
  });

app.listen(port, () => {
    console.log(`API running on localhost::${port}`);
});