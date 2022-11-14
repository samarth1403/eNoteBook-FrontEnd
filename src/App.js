import "./App.css";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import { Routes, Route , Navigate} from "react-router-dom";
import NotesState from "./contexts/Notes/NotesState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";


const App = () =>{

    const [status , setStatus] = useState(0)
 
    return(
    <div>
      <NotesState>
        <Navbar setStatus={setStatus}/>
        <div className="container my-3">
          <Alert />
        </div>
        <div className="container">
          <Routes>
            <Route exact path="/" element={status === 0 ?<Navigate to='/login'/>:<Home key="Home" />} />
            <Route exact path="/about" element={status === 0 ?<Navigate to='/login'/>:<About key="About" />} />
            <Route exact path="/login" element={<Login setStatus={setStatus} key="Login" />} />
            <Route exact path="/signup" element={<Signup setStatus={setStatus} key="Signup" />} />
          </Routes>
        </div>
      </NotesState>
    </div>
    )

}

export default App;
