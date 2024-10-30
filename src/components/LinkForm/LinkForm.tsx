import React from "react";
import "./LinkForm.css";
import { useSelector } from "react-redux";
import { selectToken } from "../../reducers/authSlice";
import { useNavigate } from "react-router-dom";

type DivContent = {
  url: string;
  startDate: string | null;
  expireDate: string | null;
};

interface LinkFormProps {
  visibleForm: boolean;
  setVisibleForm: React.Dispatch<React.SetStateAction<boolean>>;
  divList: DivContent[];
  setDivList: React.Dispatch<React.SetStateAction<DivContent[]>>;
}

const LinkForm: React.FC<LinkFormProps> = ({
  visibleForm,
  setVisibleForm,
  divList,
  setDivList,
}: LinkFormProps) => {
  const [inputValue, setInputValue] = React.useState("");
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const openForm = () => {
    if (visibleForm === true) {
      alert("Form is already open");
    } else {
      setVisibleForm(true);
    }
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function saveButtonClick() {
    if (inputValue === "") {
      alert("Please give your links a name");
    }
    fetch("http://localhost:4000/links/new-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: inputValue }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user links");
        }
        return response.json();
      })
      .then((data) => {
        return data.data._id;
      })
      .then((id) => {
        for (const link of divList) {
          fetch(`http://localhost:4000/links/${id}/new-target`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(link),
          });
        }
        navigate("/")
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="linkForm">
      <p>Let's create a new link! To get started, give it a name.</p>
      <input
        type="text"
        name="linkname"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your Link name here..."
      />
      <div className="actionButtonsContainer">
        <button className="blueButton" onClick={saveButtonClick}>
          Save
        </button>
        <button onClick={openForm} className="blueButton">
          Add Target
        </button>
      </div>
    </div>
  );
};

export default LinkForm;
