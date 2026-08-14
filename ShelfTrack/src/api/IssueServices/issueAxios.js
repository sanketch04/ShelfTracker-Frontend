import api from "../axios.js";

export const issueBook = async ({
  bookCopyId,
  memberId,
  dueDate,
}) => {
  const response = await api.post("/Issue", {
    bookCopyId: Number(bookCopyId),
    memberId: Number(memberId),
    dueDate: dueDate || null,
  });

  return response.data;
};

export const returnBook = async (issueRecordId) => {
  const response = await api.post(
    `/Issue/${issueRecordId}/return`
  );

  return response.data;
};

export const getIssue = async (issueRecordId) => {
  const response = await api.get(
    `/Issue/${issueRecordId}`
  );

  return response.data;
};
