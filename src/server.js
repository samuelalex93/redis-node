require('dotenv/config');
const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json());

app.use(router);

app.listen(process.env.PORT_API, () => {
  console.log(`Server running on the PORT ${process.env.PORT_API}`)
})