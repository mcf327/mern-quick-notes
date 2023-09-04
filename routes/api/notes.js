const express = require('express');
const router = express.Router();
const notesCtrl = require('../../controllers/api/notes');

// GET /api/notes
router.get('/notes', notesCtrl.getNotes);

// POST /api/notes
router.post('/create', notesCtrl.createNote);

module.exports = router;