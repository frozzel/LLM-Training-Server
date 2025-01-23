///////////////////////////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    console.log('🚀 Socket Routes Test 🚀' );
    res.json({ message: '🚀 Socket Routes Test 🚀' }    );
});

module.exports = router;
