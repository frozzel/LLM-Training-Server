///////////////////////////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();
const { testApi, createAssistant } = require('../controllers/training.js');


/////////////////////////// use routes modules ///////////////////////////
router.get('/test', testApi);
router.get('/create', createAssistant);

module.exports = router;