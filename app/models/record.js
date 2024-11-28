const express = require('express');
const router = express.Router();
const recordUtils = require('../controllers/record_utils');
const authMiddleware = require('../controllers/token_utils');

// GetRecords :P
router.get('/', authMiddleware.verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const userRecords = await recordUtils.getUserRecords(userId);
        res.json(userRecords);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener records', error: error.message });
    }
});

// Create record
router.post('/', authMiddleware.verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const newRecord = await recordUtils.createRecord(userId, req.body);
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear record', error: error.message });
    }
});

module.exports = router;