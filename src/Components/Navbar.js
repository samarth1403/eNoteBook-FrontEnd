import React, { useContext, useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotesContext from "../contexts/Notes/NotesContext";

const Navbar = (props) => {
  let redirectToLogin = useNavigate();
  let location = useLocation();
  useEffect(() => {
    // console.log(location.pathname)
  }, [location]);

  const Context = useContext(NotesContext);
  const logoutLoginButtonText = Context.logoutLoginButtonText;
  const setlogoutLoginButtonText = Context.setlogoutLoginButtonText;


  const handleLogout = () => {
    localStorage.removeItem("token");
    redirectToLogin("/login");
    setlogoutLoginButtonText("Login");
    props.setStatus(0)
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            eNoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="d-flex justify-content-flex-end">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/home" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/about" ? "active" : ""
                    }`}
                    to="/about"
                  >
                    About
                  </Link>
                </li>
                {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/">Action</a></li>
            <li><a className="dropdown-item" href="/">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="/">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li> */}
              </ul>
              {/* {localStorage.getItem("token") === "true" && (
                <div>
                  <Link
                    to="/login"
                    className="btn btn-primary mx-1"
                    type="submit"
                  >
                    Login
                  </Link>
                </div>
              )} */}
              {localStorage.getItem("token") !== "true" && (
                <div>
                  <button
                    className="btn btn-primary mx-1"
                    onClick={handleLogout}
                  >
                    {logoutLoginButtonText}
                  </button>
                </div>
              )}
              <Link to="/signup" className="btn btn-primary mx-1" type="submit">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
