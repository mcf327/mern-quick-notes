import { useState } from 'react';
import * as notesAPI from '../../utilities/notes-api';
import './NewNoteForm.css';

export default function NewNoteForm({ handleAddNote }) {
    const [noteText, setNoteText] = useState('');

    async function handleSubmit(evt) {
        evt.preventDefault();
        if (noteText === '') return;
        try {
            const newNote = await notesAPI.createNote({ text: noteText });
            setNoteText('');
            handleAddNote(newNote);
        } catch (err) {
            console.log('Error creating note: ', err);
        }
    }
    
    return (
       <div className="new-note-form"> 
         <p>Add a new note: </p>
         <form onSubmit={handleSubmit} className="input-box">
            <textarea
                className="note-input"
                placeholder="Enter your note..."
                value={noteText}
                onChange={(evt) => setNoteText(evt.target.value)}
            ></textarea>
            <button type="submit" className="add-note-button">Add Note</button>
         </form>
       </div> 
    );
}