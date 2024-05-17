import React, { useEffect, useState } from "react";
import "./LinkList.css";
import { useSelector } from "react-redux";
import { selectToken } from "../../reducers/authSlice";
import getUserLinks from "../../api/getUserLinks";

interface ILink {
  _id: string;
  name: string;
  targets: any[];
}

function LinkList() {
  const token = useSelector(selectToken);
  const [userLinks, setUserLinks] = useState<ILink[]>([]);
  const [urlTargetBody, setUrlTargetBody] = useState("");
  const [expireDateTargetBody, setExpireDateTargetBody] = useState("");
  const [startDateTargetBody, setStartDateTargetBody] = useState("");
  const [editedTargetId, setEditedTargetId] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      getUserLinks(token).then((data: any) => {
        setUserLinks(data);
      });
    }
  }, [token]);

  async function linkDelete(linkId: string) {
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

  async function deleteTarget(linkId: any, targetId: any) {
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

  async function editTarget(linkId: any, targetId: any): Promise<any> {
    try {
      const editResponse = await fetch(
        `http://localhost:4000/links/${linkId}/${targetId}/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            url: urlTargetBody,
            expireDate: expireDateTargetBody,
            startDate: startDateTargetBody,
          }),
        }
      );

      if (!editResponse.ok) {
        throw new Error("Failed to edit target");
      }

      const data = await getUserLinks(token);
      setUserLinks(data);
    } catch (error) {
      console.error("Error editing target:", error);
    }
    setEditedTargetId(null);
  }

  function openEditInputsTarget(
    url: string,
    startDate: string,
    expireDate: string,
    targetId: string
  ) {
    setUrlTargetBody(url);
    setExpireDateTargetBody(expireDate);
    setStartDateTargetBody(startDate);
    setEditedTargetId(targetId);
  }

  function cancelEditTarget() {
    setEditedTargetId(null);
  }

  function handleChange(event: any) {
    const { name, value } = event.target;
    if (name === "url") {
      setUrlTargetBody(value);
    } else if (name === "startDate") {
      setStartDateTargetBody(value);
    } else if (name === "expireDate") {
      setExpireDateTargetBody(value);
    }
  }
  

  return (
    <div className="linkList">
      <ul className="listContainer">
        {userLinks.map((link) => (
          <li key={link._id}>
            <h2>{link.name}</h2>
            <h3>Targets:</h3>
            <ul>
              {link.targets.map((target) => (
                <li key={target._id}>
                  {editedTargetId === target._id ? (
                    <>
                      <p>
                        URL:{" "}
                        <input
                          name="url"
                          type="text"
                          value={urlTargetBody}
                          onChange={handleChange}
                        />
                      </p>
                      <p>
                        Starts on:{" "}
                        <input
                          name="startDate"
                          type="date"
                          value={startDateTargetBody ? (startDateTargetBody.split("T")[0]) : ( "" )}
                          onChange={handleChange}
                        />
                      </p>
                      <p>
                        Expires on:{" "}
                        <input
                          name="expireDate"
                          type="date"
                          value={expireDateTargetBody ? (expireDateTargetBody.split("T")[0]) : ("")}
                          onChange={handleChange}
                        />
                      </p>
                      <p>Active Clicks: {target.activeClicks}</p>
                      <p>Inactive Clicks: {target.inactiveClicks}</p>
                      <p>
                        Total Clicks:{" "}
                        {target.inactiveClicks + target.activeClicks}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        URL:{" "}
                        <a
                          href={`http://${target.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
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
                        Total Clicks:{" "}
                        {target.inactiveClicks + target.activeClicks}
                      </p>
                    </>
                  )}
                  <div className="buttonsContainer">
                    {editedTargetId === target._id ? (
                      <>
                        <button
                          className="greenButton editButton"
                          onClick={() => editTarget(link._id, target._id)}
                        >
                          Save
                        </button>
                        <button
                          className="whiteButton"
                          onClick={cancelEditTarget}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="blueButton"
                          onClick={() =>
                            openEditInputsTarget(
                              target.url,
                              target.startDate,
                              target.expireDate,
                              target._id
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="redButton"
                          onClick={() => deleteTarget(link._id, target._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <button className="redButton" onClick={() => linkDelete(link._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LinkList;
