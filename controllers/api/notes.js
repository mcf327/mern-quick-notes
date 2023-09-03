const Note = require('../../models/note.js');

async function getNotes(req, res) {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
}

module.exports = {
    getNotes
}