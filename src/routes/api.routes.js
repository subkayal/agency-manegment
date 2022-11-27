
const express = require('express');
const app = express();

const authRoutes = require('../modules/auth');
const agencyRoutes = require('../modules/agency');
const clientRoutes = require('../modules/client');


app.use('/', authRoutes);
app.use('/agency', agencyRoutes);
app.use('/client', clientRoutes);



module.exports = app;
 