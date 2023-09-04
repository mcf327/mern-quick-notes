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

async function updateNote(req, res) {
    try {
      const { id } = req.params;
      const { text } = req.body;
      const note = await Note.findById(id);
  
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      note.text = text;
      const updatedNote = await note.save();
  
      res.json(updatedNote);
    } catch (error) {
      console.error('Error updating note:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = {
    getNotes,
    createNote,
    deleteNote,
    updateNote
}