import { logout } from "../reducers/authSlice";
import { Dispatch } from "redux";

export default async function getUserLinksApi(
  dispatch: Dispatch,
  token: string | null,
  navigate: (path: string) => void
) {
  try {
    if (!token) {
      console.error("Token is missing");
      dispatch(logout());
      navigate("/")
      return [];
    }

    //console.log("Token being sent:", token);

    const response = await fetch("http://localhost:4000/links", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      console.error("Unauthorized access - possible token expiration or invalid token.");
      alert("Session expired, try logging in again!")
      dispatch(logout());
      navigate("/login");
      return [];
    }

    if (!response.ok) {
      throw new Error("Failed to fetch user links");
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching user links:", error);
    return [];
  }
}
