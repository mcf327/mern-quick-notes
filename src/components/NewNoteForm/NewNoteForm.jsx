import { useState } from 'react';
import * as notesAPI from '../../utilities/notes-api';

export default function NewNoteForm({ handleAddNote }) {
    const [noteText, setNoteText] = useState('');

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const newNote = await notesAPI.createNote({ text: noteText });
            setNoteText('');
            handleAddNote(newNote);
        } catch (err) {
            console.log('Error creating note: ', err);
        }
    }
    
    return (
       <> 
        <p>Add a new note: </p>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter your note..."
                value={noteText}
                onChange={(evt) => setNoteText(evt.target.value)}
            />
            <button type="submit">Add Note</button>
        </form>
       </> 
    );
}