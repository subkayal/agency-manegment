
const express = require('express');
const app = express();

const authRoutes = require('../modules/auth');
const agencyRoutes = require('../modules/agency');


app.use('/', authRoutes);
app.use('/agency', agencyRoutes);



module.exports = app;
 