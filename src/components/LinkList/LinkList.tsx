import React, { useEffect, useState } from "react";
import "./LinkList.css";
import { useSelector } from "react-redux";
import { selectToken } from "../../reducers/authSlice";

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
    const fetchUserLinks = async () => {
      try {
        const response = await fetch("http://localhost:4000/links", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user links");
        }
        const data = await response.json();
        console.log(data.data);
        setUserLinks(data.data || []);
      } catch (error) {
        console.error("Error fetching user links:", error);
      }
    };

    if (token) {
      fetchUserLinks();
    }
  }, [token]);

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
                      ? target.startDate
                      : "Active from creation"}
                  </p>
                  <p>
                    Epxires on:{" "}
                    {target.expireDate ? target.expireDate : "No expiration"}
                  </p>
                  <p>Active Clicks: {target.activeClicks}</p>
                  <p>Inactive Clicks: {target.inactiveClicks}</p>
                  <p>
                    Total Clicks: {target.inactiveClicks + target.activeClicks}
                  </p>
                  <div className="buttonsContainer">
                    <button className="blueButton editButton">Edit</button>
                    <button className="whiteButton">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LinkList;
