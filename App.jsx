import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const saveNote = () => {
    if (!text.trim()) return;

    if (editId) {
      setNotes(
        notes.map((note) =>
          note.id === editId ? { ...note, text } : note
        )
      );
      setEditId(null);
    } else {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          text,
        },
      ]);
    }

    setText("");
    inputRef.current.focus();
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (note) => {
    setText(note.text);
    setEditId(note.id);
    inputRef.current.focus();
  };

  return (
    <div className="container">
      <h1>Notes</h1>

      <div className="notes-grid">

        <div className="add-card">
          <textarea
            ref={inputRef}
            placeholder="Type....."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button onClick={saveNote}>
            {editId ? "Update" : "Save"}
          </button>
        </div>

        {notes.map((note) => (
          <div className="note-card" key={note.id}>
            <p>{note.text}</p>

            <div className="btn-group">
              <button
                className="delete-btn"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>

              <button
                className="edit-btn"
                onClick={() => editNote(note)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;