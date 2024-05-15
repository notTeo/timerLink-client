export default async function getUserLinks(token: string | null) {
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
    return data.data || [];
  } catch (error) {
    console.error("Error fetching user links:", error);
    return [];
  }
}
