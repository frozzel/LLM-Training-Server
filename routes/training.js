///////////////////////////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();
const { testApi, createAssistant, createThread, createMessage, getAiResponse } = require('../controllers/training.js');


/////////////////////////// use routes modules ///////////////////////////
router.get('/test', testApi);
router.get('/createAssistant', createAssistant);
router.get('/threadId', createThread);
router.get('/createMessage', createMessage);
router.get('/getAiResponse', getAiResponse);

module.exports = router;