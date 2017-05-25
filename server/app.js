"use strict";
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const settings = require('./settings');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

function client_encode(url, body) {
  let shared_secret = encode_utf8(url + "\0" + body + settings.client_secret);
  return crypto.createHash('sha512').update(shared_secret).digest('hex');
}

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;