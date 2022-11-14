import React, { useState } from "react";
import NotesContext from "./NotesContext";


const NotesState = (props) => {
  // let initialstate = {
  //     "name":"Sagar",
  //     "age":"20"
  // }
  // const [state , setState] =useState(initialstate)

  // const update = () =>{setTimeout(()=>{
  //     setState({
  //         "name":"Ghagar",
  //         "age":"10"
  //     })
  // },1000)}
  const host = "http://localhost:5000";
  const initialNotes = [];

  const [alert, setAlert] = useState(null);

  const [logoutLoginButtonText, setlogoutLoginButtonText] = useState("Login");

  

  const handleAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };


  //Get all Notes
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });

    const note = await response.json();
    setNotes(notes.concat(note)); //Concat returns an array while push updates an array
  };

  //Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    console.log(json);

    //Logic to delete note on Client side
    //console.log("Deleting note with id" + id)
    let newnotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newnotes);
    handleAlert(" Note Deleted", "success");
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call
    //Function search on google fetch with headers
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json); // parses JSON response into native JavaScript object

    //Logic to Edit a note in Client
    let newnotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newnotes);
    handleAlert(" Note Updated", "success");
  };

  const [notes, setNotes] = useState(initialNotes);
  return (
    <NotesContext.Provider
      value={{
        notes,
        alert,
        logoutLoginButtonText,
        getNotes,
        addNote,
        deleteNote,
        editNote,
        handleAlert,
        setlogoutLoginButtonText
      }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};

export default NotesState;
