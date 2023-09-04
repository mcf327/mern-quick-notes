import sendRequest from "./send-request";

const BASE_URL = '/api/notes';

export function getAll() {
    return sendRequest(BASE_URL);
}

export function createNote(noteData) {
    return sendRequest(`${BASE_URL}/create`, 'POST', noteData);
}

export function deleteNote(noteId) {
    return sendRequest(`${BASE_URL}/delete/${noteId}`, 'DELETE');
  }