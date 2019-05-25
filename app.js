const express = require('express');
const app = express();
const workshopRoutes = require('./api/routes/workshop');

app.use('/workshop', workshopRoutes);

module.exports = app;