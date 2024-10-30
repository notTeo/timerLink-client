export default async function DeleteLinkApi(
  token: string | null,
  linkId: string
) {
  try {
    const response = await fetch(
      `http://localhost:4000/links/${linkId}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
      return response
  } catch (error) {
    console.error("Error deleting link:", error);
  }
}
