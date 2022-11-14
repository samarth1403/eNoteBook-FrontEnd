import React, { useContext } from "react";
import NotesContext from "../contexts/Notes/NotesContext";

const Alert = () => {
  const Context = useContext(NotesContext);
  const alert = Context.alert;

  const capitalize = (word) => {
    if(word === 'danger'){
      word='Error'
    }
    const lower = word.toLowerCase()
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <>
    <div className = "container" style={{ height: "45px" }}>
      {alert && 
          <div
            className={`alert alert-${alert.type} container alert-dismissible fade show d-flex justify-content-center`}
            role="alert"
            style={{ maxWidth: 400}}
          >
            <strong>{capitalize(alert.type) }</strong>
              {alert.message}
        </div>
      }
    </div>
    </>
  );
};
export default Alert;
