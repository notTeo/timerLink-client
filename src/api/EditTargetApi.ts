export default async function EditTargetApi(
  token: string | null,
  linkId: string,
  targetId: string,
  urlTargetBody: string,
  expireDateTargetBody: string,
  startDateTargetBody: string
) {
  fetch(`http://localhost:4000/links/${linkId}/${targetId}/edit`, {
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
  });
}
