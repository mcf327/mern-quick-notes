import { useState, useEffect } from 'react';
import * as notesAPI from "../../utilities/notes-api";
import NewNoteForm from '../../components/NewNoteForm/NewNoteForm';


export default function MyNotesPage() {
  const [notes, setNotes] = useState([]);
  
  useEffect(function() {
    async function getNotes() {
      const notes = await notesAPI.getAll();
      setNotes(notes);
    }
    getNotes();
  }, []);

  function handleAddNote(newNote) {
    setNotes([...notes, newNote]);
  }

  return (
    <>
      <h1>My Notes</h1>
      <NewNoteForm handleAddNote={handleAddNote} />
      {notes.length === 0 ? (
        <p>No Notes Yet!</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li>
              {note.text} - {new Date(note.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}