import { useState, useEffect } from 'react';
import * as notesAPI from "../../utilities/notes-api";
import NewNoteForm from '../../components/NewNoteForm/NewNoteForm';
import './MyNotesPage.css';


export default function MyNotesPage() {
  const [notes, setNotes] = useState([]);
  const [sortOrder, setSortOrder] = useState('descending');
  
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
            </div>
          ))}
        </ul>
      )}
    </>
  );
}