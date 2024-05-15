import React, { useEffect, useState } from "react";
import "./LinkList.css";
import { useSelector } from "react-redux";
import { selectToken } from "../../reducers/authSlice";
import getUserLinks from "../../api/getUserLinks"

interface ILink {
  _id: string;
  name: string;
  targets: any[];
}

function LinkList() {
  const token = useSelector(selectToken);
  const [activeClicks, setActiveClicks] = useState(0);
  const [userLinks, setUserLinks] = useState<ILink[]>([]);

  function clickCounter() {
    setActiveClicks(activeClicks + 1);
  }

  useEffect(() => {
    if (token) {
      getUserLinks(token).then((data:any) => {
        setUserLinks(data);
      });
    }
  }, [token]);

  function linkDelete(linkId: string) {
    fetch(`http://localhost:4000/links/${linkId}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((deleteResponse) => {
        if (!deleteResponse.ok) {
          throw new Error("Failed to delete target");
        }
        return getUserLinks(token).then((data: any) => {
          setUserLinks(data);
        });
      })
      .catch((error) => {
        console.error("Error deleting link:", error);
      });
  }

  function deleteTarget(linkId: any, targetId: any) {
    fetch(`http://localhost:4000/links/${linkId}/${targetId}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((deleteResponse) => {
        if (!deleteResponse.ok) {
          throw new Error("Failed to delete target");
        }
        return getUserLinks(token).then((data: any) => {
          setUserLinks(data);
        });
      })
      .catch((error) => {
        console.error("Error deleting target:", error);
      });
  }

  return (
    <div className="linkList">
      <ul className="listContainer">
        {userLinks.map((link) => (
          <li key={link._id}>
            <h2>{link.name}</h2>
            <h3>Targets:</h3>
            <ul>
              {link.targets.map((target, index) => (
                <li key={index}>
                  <p>
                    URL:{" "}
                    <a
                      href={`http://${target.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={clickCounter}
                    >
                      {target.url}
                    </a>
                  </p>
                  <p>
                    Starts on:{" "}
                    {target.startDate
                      ? target.startDate.split("T")[0]
                      : "Active from creation"}
                  </p>
                  <p>
                    Expires on:{" "}
                    {target.expireDate
                      ? target.expireDate.split("T")[0]
                      : "No expiration"}
                  </p>
                  <p>Active Clicks: {target.activeClicks}</p>
                  <p>Inactive Clicks: {target.inactiveClicks}</p>
                  <p>
                    Total Clicks: {target.inactiveClicks + target.activeClicks}
                  </p>
                  <div className="buttonsContainer">
                    <button className="blueButton editButton">Edit</button>
                    <button className="redButton" onClick={() => deleteTarget(link._id, target._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
            <button className="redButton" onClick={() => linkDelete(link._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LinkList;
