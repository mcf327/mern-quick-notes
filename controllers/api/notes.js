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

async function deleteNote(req, res) {
    await Note.findByIdAndRemove(req.params.id);
}

module.exports = {
    getNotes,
    createNote,
    deleteNote
}