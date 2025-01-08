/////////////////////////// import modules ///////////////////////////
const express = require('express');
require('dotenv').config()// import dotenv
var cors = require('cors')// import cors
require('./config/database')//   import database connection


/////////////////////////// use middleware ///////////////////////////
const app = express();
app.use(express.static('public'));
app.use(express.json())// parse json request body
app.use(cors())// enable cors


/////////////////////////// import routes ///////////////////////////
const trainingRoutes = require('./routes/training.js');
const socketRoutes = require('./routes/socket.js');


/////////////////////////// use routes ///////////////////////////
app.use('/api/training', trainingRoutes);
app.use('/api/socket', socketRoutes);


/////////////////////////// start server ///////////////////////////
const server = require('http').Server(app); // import http
const PORT = process.env.PORT || 8080;

/////////////////////// test server running ///////////////////////
app.get('/', (req, res) => {
    const date = new Date();
    res.send(`<body style="background: #333; display: flex">
        <div style="width: 30%; height: auto"></div>
        <div style="display: flex-column; position: relative; top: 25%; width: 100%; height: 15%; box-shadow: 0 0 3px 2px #cec7c759; padding: 1em; border-radius: 8px;">
        <h1 style="text-align: center; color: white;">🚀  Server Running  🚀</h1> \n 
        <h3 style="text-align: center; color: white">${date.toString().slice(0, 24)}</h3>
        </div><div style="width: 30%; height: auto"></div>
        </body>`
     );
});

server.listen(PORT,  () => {// start express server on port 8080
    console.log(`///////////////////////////////////////////////\n`)
    console.log(`🚀  Server running on http://localhost:${PORT}, 🚀\n`)
    console.log(`//////////////////////////////////////////////\n`)
    console.log(`⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️ Starting Database ⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️\n`)
    console.log(`//////////////////////////////////////////////\n`)
   
    
})