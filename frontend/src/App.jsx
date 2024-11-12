import { useState, useEffect } from 'react';
import { fetchNotes, addNote, deleteNote } from './api';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const loadNotes = async () => {
      const response = await fetchNotes();
      setNotes(response.data);
    };
    loadNotes();
  }, []);

  const handleAddNote = async () => {
    if (newNote.trim()) {
      await addNote(newNote);
      setNewNote('');
      const response = await fetchNotes();
      setNotes(response.data);
    }
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter((note) => note._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📝 My Notes App</h1>

        {/* Input Section */}
        <div className="space-y-4">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write a new note..."
          />
          <button
            onClick={handleAddNote}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Add Note
          </button>
        </div>

        {/* Notes List */}
        <div className="mt-8 flex overflow-x-auto space-x-4 py-4">
          {notes.length === 0 && (
            <p className="text-gray-500 text-center w-full">No notes available. Start adding some!</p>
          )}
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-gray-50 w-64 p-4 rounded-lg shadow border flex flex-col justify-between"
            >
              <p className="text-gray-800 text-left">{note.content}</p>
              <button
                onClick={() => handleDeleteNote(note._id)}
                className="text-red-500 hover:text-red-700 mt-4 self-end"
                title="Delete Note"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
