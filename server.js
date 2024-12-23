/////////////////////////// import modules ///////////////////////////
const express = require('express');
require('dotenv').config()// import dotenv
var cors = require('cors')// import cors
const http = require('http');

/////////////////////////// use middleware ///////////////////////////
const app = express();
app.use(express.static('public'));
app.use(express.json())// parse json request body
app.use(cors())// enable cors


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});