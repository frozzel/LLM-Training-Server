//////////////// Load Modules //////////////////////////
const express = require('express');
const router = express.Router();

///////////////// Import Controllers ////////////////////
const { testApi, getCozyBlogs, createAssistant, createMessage, getAiResponse } = require('../controllers/cozythrowie.js');


///////////////// Routes ////////////////////////////////
router.get('/test', testApi);
router.get('/blog', getCozyBlogs);
router.get('/createAssistant', createAssistant);
router.get('/createMessage', createMessage);
router.get('/getAiResponse', getAiResponse);




module.exports = router;