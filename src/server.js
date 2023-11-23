const express = require('express');
const router = require('./routes')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 3000;

app.use(cors());

app.use('/', router);

app.listen(port, () => {
  console.log(`Server berjalan pada http://localhost:${port}`);
});