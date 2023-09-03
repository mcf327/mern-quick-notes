import { useState, useEffect } from 'react';
import { checkToken } from "../../utilities/users-service";
import * as notesAPI from "../../utilities/notes-api";


export default function MyNotesPage() {
  const [notes, setNotes] = useState([]);
  
  useEffect(function() {
    async function getNotes() {
      const notes = await notesAPI.getAll();
      setNotes(notes);
    }
    getNotes();
  }, []);

  return (
    <>
      <h1>My Notes</h1>
      {notes.length === 0 ? (
        <p>No Notes Yet!</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li>
              {note.text}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}