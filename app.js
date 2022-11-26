require('dotenv').config();

// node modules
const http = require('http');

// npm modules
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer');
const express = require('express');
const bodyParser = require('body-parser');

// app modules
const mongoose = require('./src/database/mongoose');
const { requireApiKey } = require('./src/config/middleware/apikey');

const uploadMulter = multer({
  limits: {
    fileSize: 8000000,
  },
});


// express instance
const app = express();

// cors options
const corsOptions = {
  origin: '*',
  exposedHeaders: 'Content-Type, X-Auth-Token',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false,
};

// Database setup
mongoose.connect();

// middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routes
app.use('/api/v1', requireApiKey, uploadMulter.any(), require('./src/routes/api.routes'));




// server setup
const port = process.env.PORT || 7000;
const server = http.createServer(app);
server.listen(port, (err) => {
  if (err) {
    console.log(`Error : ${err}`);
    process.exit(-1);
  }
  console.log('Server is running')
});

module.exports = server;