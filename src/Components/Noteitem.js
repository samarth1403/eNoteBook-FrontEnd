import React, { useContext } from "react";
import NotesContext from "../contexts/Notes/NotesContext";

const Noteitem = (props) => {
  const notes = props.notes;
  const updateNoteModal = props.updateNoteModal

  const Context = useContext(NotesContext);
  const deleteNote = Context.deleteNote

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{notes.title}</h5>
          <p>{notes.tag}</p>
          <h6 className="card-text">{notes.description}</h6>
          <div className="d-flex justify-content-between">
            <i className="fa-solid fa-trash-can" onClick={()=>{deleteNote(notes._id)}}></i>
            <i className="fa-solid fa-pen-to-square"onClick={()=>{updateNoteModal(notes)}}></i>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
