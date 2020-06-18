const express = require('express');

const welcomeRouter = require('./welcome/welcome-router.js');
const schemeRouter = require('./schemes/scheme-router.js');

const server = express();

server.use(express.json());

server.use('/api', welcomeRouter);
server.use('/api/schemes', schemeRouter);

module.exports = server;