const express = require('express');
const router = express.Router();
const notesCtrl = require('../../controllers/api/notes');

// GET /api/notes
router.get('/', notesCtrl.getNotes);

// POST /api/notes
router.post('/create', notesCtrl.createNote);

// DELETE /api/notes/delete/:id
router.delete('/delete/:id', notesCtrl.deleteNote);

module.exports = router;