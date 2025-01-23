//////////////// Load Modules //////////////////////////
const express = require('express');
const router = express.Router();

///////////////// Import Controllers ////////////////////
const { testApi, getCozyBlogs } = require('../controllers/cozythrowie.js');


///////////////// Routes ////////////////////////////////
router.get('/test', testApi);
router.get('/blog', getCozyBlogs);



module.exports = router;