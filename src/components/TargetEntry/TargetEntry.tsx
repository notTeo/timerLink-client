import React, { useState, ReactElement } from "react";
import "./TargetEntry.css";

interface TargetEntryProps {
  visibleForm: boolean;
  setVisibleForm: React.Dispatch<React.SetStateAction<boolean>>;
}
type DivContent = string | ReactElement;

const TargetEntry: React.FC<TargetEntryProps> = ({ visibleForm, setVisibleForm }) => {
  const [isCheckedStartsOn, setIsCheckedStartsOn] = useState(false);
  const [isCheckedExpiresOn, setIsCheckedExpiresOn] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [divList, setDivList] = useState<DivContent[]>([]);

  const closeForm = () => {
    setVisibleForm(false);
  };

  function handleCheckboxStartsOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsCheckedStartsOn(e.target.checked);
  }

  function handleCheckboxExpiresOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsCheckedExpiresOn(e.target.checked);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleExpireDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpireDate(e.target.value);
  };

  const createDiv = () => {
    const newDiv = (
      <div>
        <p>URL: {urlInput}</p>
        {isCheckedStartsOn && <p>Start Date: {startDate}</p>}
        {isCheckedExpiresOn && <p>Expire Date: {expireDate}</p>}
      </div>
    );
    setDivList(prevDivs => [...prevDivs, newDiv]);
    closeForm();
  };

  
  return (
    <div>
      {visibleForm && (
        <div className="targetEntry">
          <div className="urlInputContainer">
            <input
              type="text"
              name="urlInput"
              placeholder="Enter URL..."
              value={urlInput}
              onChange={handleInputChange}
            />
          </div>
          <div className="otherInputsContainer">
            <div className="startsOnContainer">
              <label htmlFor="startsOnDate">
                Start Date
                <input
                  type="checkbox"
                  className="checkbox"
                  name="startsOnDate"
                  id="startsOnDate"
                  checked={isCheckedStartsOn}
                  onChange={handleCheckboxStartsOnChange}
                />
              </label>
              <input
                type="date"
                disabled={!isCheckedStartsOn}
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>
            <div className="expiresOnContainer">
              <label htmlFor="expiresOnDate">
                Expire Date
                <input
                  type="checkbox"
                  className="checkbox"
                  name="expiresOnDate"
                  id="expiresOnDate"
                  checked={isCheckedExpiresOn}
                  onChange={handleCheckboxExpiresOnChange}
                />
              </label>
              <input
                type="date"
                disabled={!isCheckedExpiresOn}
                value={expireDate}
                onChange={handleExpireDateChange}
              />
            </div>
          </div>
          <div className="buttonsContainer">
            <button className="blueButton editButton" onClick={createDiv}>
              Add
            </button>
            <button className="whiteButton" onClick={closeForm}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <div>
        {divList.map((divContent, index) => (
          <div key={index} className="createdDiv">
            {divContent}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TargetEntry;
