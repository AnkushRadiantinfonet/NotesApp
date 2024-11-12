import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes';

export const fetchNotes = async () => axios.get(API_URL);
export const addNote = async (content) => axios.post(`${API_URL}/add`, { content });
export const deleteNote = async (id) => axios.delete(`${API_URL}/${id}`);
