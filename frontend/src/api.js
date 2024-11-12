import axios from 'axios';

const API_URL = 'https://notesapp-52i8.onrender.com';

export const fetchNotes = async () => axios.get(API_URL);
export const addNote = async (content) => axios.post(`${API_URL}/add`, { content });
export const deleteNote = async (id) => axios.delete(`${API_URL}/${id}`);
