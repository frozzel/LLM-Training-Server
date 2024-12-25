///////////////////////////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();
const { testApi } = require('../controllers/training.js');


/////////////////////////// use routes modules ///////////////////////////
router.get('/test', testApi);

module.exports = router;