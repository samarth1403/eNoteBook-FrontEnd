import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotesContext from "../contexts/Notes/NotesContext";

const Signup = (props) => {
  const Context = useContext(NotesContext);
  const handleAlert = Context.handleAlert;

  const [signupCredentials, setSignupCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  let redirectToHome = useNavigate();

  const onChangeSignupCredentialsFields = (e) => {
    setSignupCredentials({
      ...signupCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setSignupCredentials({
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    props.setStatus(1)
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: signupCredentials.name,
        email: signupCredentials.email,
        password: signupCredentials.password,
      }),
    });
    const json = await response.json();
    //console.log(json)

    if (json.success === true) {
      localStorage.setItem("token", json.authToken);
      redirectToHome("/");
      handleAlert(" Account Created Successfully", "success");
    } else {
      handleAlert(" User with this Credentials already Exists", "danger");
    }
    setSignupCredentials({
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
  };

  return (
    <div className="container d-flex justify-content-center">
      <form onSubmit={handleSignup}>
        <div className="container">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={signupCredentials.name}
              style={{ width: "25rem" }}
              onChange={onChangeSignupCredentialsFields}
              required
            />
          </div>
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
              value={signupCredentials.email}
              style={{ width: "25rem" }}
              onChange={onChangeSignupCredentialsFields}
              required
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
              value={signupCredentials.password}
              style={{ width: "25rem" }}
              onChange={onChangeSignupCredentialsFields}
              required
              minLength={5}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmpassword"
              name="confirmpassword"
              value={signupCredentials.confirmpassword}
              style={{ width: "25rem" }}
              onChange={onChangeSignupCredentialsFields}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              disabled={
                signupCredentials.password !== signupCredentials.confirmpassword
              }
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
