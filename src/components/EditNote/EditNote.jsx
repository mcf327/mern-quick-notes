import { useState } from 'react';
import * as notesAPI from '../../utilities/notes-api';
import './EditNote.css';

export default function EditNote({ note, onUpdate, onCancel }) {
    const [editText, setEditText] = useState(note.text);

    async function handleSave() {
        const updatedNote = await notesAPI.updateNote(note._id, { text: editText });
        onUpdate(updatedNote);
    }

    return (
        <div className="edit-box">
            <p>Edit Note</p>
            <textarea  cols="30" rows="5" value={editText} onChange={(evt) => setEditText(evt.target.value)}/>
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );


}