import React, { useContext, useState } from "react";
import NotesContext from "../contexts/Notes/NotesContext";

const AddNote = () => {
  const Context = useContext(NotesContext);
  const addNote = Context.addNote;
  const handleAlert = Context.handleAlert;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    handleAlert(" Note Added", "success");
  };

  return (
    <div className="container my-3">
      <div className="container my-3 text-center">
        {" "}
        <h3>Add Your Notes</h3>
      </div>

      <form className="container my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            name="title"
            value={note.title}
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={handleOnChange}
          />
        </div>

        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
