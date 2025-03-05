import React, { useEffect, useState } from "react";
import "./LinkList.css";
import { useSelector } from "react-redux";
import { selectToken } from "../../reducers/authSlice";
import getUserLinksApi from "../../api/getUserLinkApi";
import deleteLinkApi from "../../api/deleteLinkApi";
import deleteTargetApi from "../../api/DeleteTargetApi";
import editTargetApi from "../../api/EditTargetApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setLoading(true);
      getUserLinksApi(dispatch, token, navigate).then((data: any) => {
        setUserLinks(data);
      }).catch((error) => {
        console.error("Error fetching links:", error);
      })
      .finally(() => {
        setLoading(false);
      });;
    }
  }, [token]);

  async function linkDelete(linkId: string) {
    try {
      await deleteLinkApi(token, linkId);
      const data = await getUserLinksApi(dispatch, token, navigate);
      setUserLinks(data);
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  }

  async function deleteTarget(linkId: any, targetId: any) {
    try {
      await deleteTargetApi(token, linkId, targetId);
      getUserLinksApi(dispatch, token, navigate).then((data: any) => {
        setUserLinks(data);
      });
    } catch (error) {
      console.error("Error deleting target:", error);
    }
  }

  async function editTarget(linkId: any, targetId: any): Promise<any> {
    try {
      await editTargetApi(
        token,
        linkId,
        targetId,
        urlTargetBody,
        expireDateTargetBody,
        startDateTargetBody,
      );

      const data = await getUserLinksApi(dispatch, token, navigate);
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

  async function handleLinkClick(
    linkId: string,
    targetId: string,
    startDate: string | null,
    expireDate: string | null,
    currentActiveClicks: number,
    currentInactiveClicks: number
  ) {
    try {
      const currentDate = new Date();

      if (startDate && expireDate) {
        const startDateObj = new Date(startDate);
        const expireDateObj = new Date(expireDate);

        if (currentDate >= startDateObj && currentDate <= expireDateObj) {
          const response = await fetch(
            `http://localhost:4000/links/${linkId}/${targetId}/edit`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                activeClicks: currentActiveClicks + 1,
              }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to update activeClicks");
          }
        } else {
          const response = await fetch(
            `http://localhost:4000/links/${linkId}/${targetId}/edit`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                inactiveClicks: currentInactiveClicks + 1,
              }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to update inactiveClicks");
          }
        }
      } else if (startDate && !expireDate) {
        const startDateObj = new Date(startDate);

        if (currentDate >= startDateObj) {
          const response = await fetch(
            `http://localhost:4000/links/${linkId}/${targetId}/edit`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                activeClicks: currentActiveClicks + 1,
              }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to update activeClicks");
          }
        } else {
          const response = await fetch(
            `http://localhost:4000/links/${linkId}/${targetId}/edit`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                inactiveClicks: currentInactiveClicks + 1,
              }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to update inactiveClicks");
          }
        }
      } else {
        const response = await fetch(
          `http://localhost:4000/links/${linkId}/${targetId}/edit`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              activeClicks: currentActiveClicks + 1,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update activeClicks");
        }
      }

      getUserLinksApi( dispatch,token, navigate).then((data: any) => {
        setUserLinks(data);
      });
    } catch (e) {
      console.error("Error handling link click:", e);
    }
  }

  return (
    <div className="linkList">
      {loading ? (
        <div className="loading-container">
          <p>Loading links...</p>
          {/* Optional: Add a spinner */}
          <div className="spinner"></div>
        </div>
      ) : (
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
                            value={
                              startDateTargetBody
                                ? startDateTargetBody.split("T")[0]
                                : ""
                            }
                            onChange={handleChange}
                          />
                        </p>
                        <p>
                          Expires on:{" "}
                          <input
                            name="expireDate"
                            type="date"
                            value={
                              expireDateTargetBody
                                ? expireDateTargetBody.split("T")[0]
                                : ""
                            }
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
                            href={
                              (target.startDate &&
                                new Date(target.startDate) > new Date()) ||
                                (target.expireDate &&
                                  new Date(target.expireDate) < new Date())
                                ? `http://localhost:3000/${target.url}`
                                : `http://${target.url}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              handleLinkClick(
                                link._id,
                                target._id,
                                target.startDate,
                                target.expireDate,
                                target.activeClicks,
                                target.inactiveClicks
                              )
                            }
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
        </ul>)}
    </div>
  );
}

export default LinkList;
