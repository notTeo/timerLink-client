import React from "react";
import "./LinkForm.css";

interface LinkFormProps {
  visibleForm: boolean;
  setVisibleForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LinkForm({
  visibleForm,
  setVisibleForm,
}: LinkFormProps) {
  const openForm = () => {
    if (visibleForm === true) {
      alert("Form is already open");
    } else {
      setVisibleForm(true);
    }
  };

  return (
    <div className="linkForm">
      <p>Let's create a new link! To get started, give it a name.</p>
      <input
        type="text"
        name="linkname"
        id=""
        placeholder="Enter your Link name here..."
      />
      <div className="actionButtonsContainer">
        <button className="blueButton">Save</button>
        <button onClick={openForm} className="blueButton">
          Add Target
        </button>
      </div>
    </div>
  );
}
