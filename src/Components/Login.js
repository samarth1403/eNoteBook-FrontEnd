import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NotesContext from "../contexts/Notes/NotesContext";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChangeCredentialsFields = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const Context = useContext(NotesContext);
  const setlogoutLoginButtonText = Context.setlogoutLoginButtonText;


  let redirectToHome = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    props.setStatus(1)
    setlogoutLoginButtonText("Logout");
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    let json = await response.json();
   

    if (json.success === true) {
      //Save the authtoken in local storage and redirect home page
      redirectToHome("/");
      localStorage.setItem("token", json.authToken);

      //console.log(json.authToken)
    } else {
      alert("Invalid Credentials");
    }
    setCredentials({ email: "", password: "" });
  };

  return (
    <div className="container d-flex justify-content-center">
      <form onSubmit={handleLogin}>
        <div className="container">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              style={{ width: "25rem" }}
              onChange={onChangeCredentialsFields}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              style={{ width: "25rem" }}
              onChange={onChangeCredentialsFields}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
