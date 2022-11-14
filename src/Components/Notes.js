import React, { useContext, useEffect, useRef, useState } from "react";

import NotesContext from "../contexts/Notes/NotesContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

const Notes = () => {
  const Context = useContext(NotesContext);
  const notes = Context.notes;
  const getNotes = Context.getNotes;
  const editNote = Context.editNote;

  //const setNotes = NotesContext.setNotes
  useEffect(() => {
    //Agar toekn hai to hi getnotes() execute hoga and nahi hai to login page par redirect
    getNotes();
  }, []);

  const [note, setNote] = useState({
    editedid: "",
    editedtitle: "",
    editeddescription: "",
    editedtag: "",
  });

  const handleOnChange = (e) => {
    //Need to be understood
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  //To Show the Edit Modal

  const refOpen = useRef(null);
  const refClose = useRef(null);

  //On clcking update icon
  const updateNoteModal = (currentnote) => {
    refOpen.current.click(); //To Open the modal
    setNote({
      editedid: currentnote._id,
      editedtitle: currentnote.title,
      editeddescription: currentnote.description,
      editedtag: currentnote.tag,
    });
  };

  //On clicking update button present inside the modal
  const handleUpdateClick = (e) => {
    e.preventDefault();
    //console.log("Updating" , note)
    editNote(
      note.editedid,
      note.editedtitle,
      note.editeddescription,
      note.editedtag
    );
    refClose.current.click(); //To Close the Modal
  };

  return (
    <>
      <AddNote />
      {/* Modal */}
      <div className="container mt-3">
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={refOpen}
        >
          Launch demo modal
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="container my-3">
                  <div className="mb-3">
                    <label htmlFor="editedtitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editedtitle"
                      aria-describedby="emailHelp"
                      name="editedtitle"
                      value={note.editedtitle}
                      onChange={handleOnChange}
                      //required//Won't work cause we are using onClick not onSubmit
                      //minLength={5}//Won't work cause we are using onClick not onSubmit
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="editeddescription" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editeddescription"
                      name="editeddescription"
                      value={note.editeddescription}
                      onChange={handleOnChange}

                      //required//Won't work cause we are using onClick not onSubmit
                      //minLength={5}//Won't work cause we are using onClick not onSubmit
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="editedtag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editedtag"
                      name="editedtag"
                      value={note.editedtag}
                      onChange={handleOnChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <button
                  disabled={
                    note.editedtitle.length < 5 ||
                    note.editeddescription.length < 5
                  }
                  type="button"
                  className="btn btn-primary my-2"
                  onClick={handleUpdateClick}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3 ">
        <h3 className="text-center">Your Notes</h3>
        <div className="container my-3">
          {notes.length === 0 && "No Notes to Display"}
        </div>
        {notes.map((notes) => {
          return (
            <Noteitem
              key={notes._id}
              notes={notes}
              updateNoteModal={updateNoteModal}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
