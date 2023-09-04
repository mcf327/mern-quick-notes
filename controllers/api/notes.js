const Note = require('../../models/note.js');

async function getNotes(req, res) {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
}

async function createNote(req, res) {
    const note = await Note.create({
        text: req.body.text,
        user: req.user._id
    });
    res.json(note);
}

module.exports = {
    getNotes,
    createNote
}