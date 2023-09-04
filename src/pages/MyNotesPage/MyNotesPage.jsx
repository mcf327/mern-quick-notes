import { useState, useEffect } from 'react';
import * as notesAPI from "../../utilities/notes-api";
import NewNoteForm from '../../components/NewNoteForm/NewNoteForm';
import EditNote from '../../components/EditNote/EditNote';
import './MyNotesPage.css';


export default function MyNotesPage() {
  const [notes, setNotes] = useState([]);
  const [sortOrder, setSortOrder] = useState('descending');
  const [editNoteId, setEditNoteId] = useState(null);
  
  useEffect(() => {
    async function getNotes() {
      const notes = await notesAPI.getAll();
      const sortedNotes = sortNotes(notes, sortOrder);
      setNotes(sortedNotes);
    }
    getNotes();
  }, [sortOrder]);

  function handleAddNote(newNote) {
    setNotes([...notes, newNote]);
  }

  async function handleDeleteNote(noteId) {
    setNotes(notes.filter((note) => note._id !== noteId));
    await notesAPI.deleteNote(noteId);
  }

  function toggleSortOrder() {
    const newSortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
    setSortOrder(newSortOrder);
  }

  function sortNotes(notes, order) {
    return [...notes].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === 'ascending' ? dateA - dateB : dateB - dateA;
    });
  }

  function handleEditClick(noteId) {
    const note = notes.find((note) => note._id === noteId);
    setEditNoteId(noteId);
  }

  async function handleSaveNote(noteId, editedText) {
    const updatedNote = await notesAPI.updateNote(noteId, { text: editedText });
    const updatedNotes = notes.map((note) => 
      note._id === updatedNote._id ? updatedNote : note
    );
    setNotes(updatedNotes);
    setEditNoteId(null);
  }

  function handleCancelEdit() {
    setEditNoteId(null);
  }

  return (
    <>
      <h1>My Notes</h1>
      <button onClick={toggleSortOrder}>
         Toggle Sorting Order ({sortOrder === "ascending" ? "Ascending" : "Descending"})
      </button>
      <NewNoteForm handleAddNote={handleAddNote} />
      {notes.length === 0 ? (
        <p>No Notes Yet!</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <div key={note._id} className="note">
              {note.text} - {new Date(note.createdAt).toLocaleString()}
              <div className="note-buttons">
                <button className="edit-button" onClick={() => handleEditClick(note._id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteNote(note._id)}>
                 Delete
                </button>
              </div>  
            </div>
          ))}
        </ul>
      )}
      {editNoteId && (
        <EditNote
          note={notes.find((note) => note._id === editNoteId)}
          onSave={handleSaveNote}
          onCancel={handleCancelEdit}
        />
      )}
    </>
  );
}