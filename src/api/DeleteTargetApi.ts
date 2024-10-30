
export default async function deleteTargetApi(token: string | null, linkId: string, targetId: string) {
    try {
      const response = await fetch(
        `http://localhost:4000/links/${linkId}/${targetId}/delete`,
          {
            method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw new Error("Failed to delete target");
    }
  }
