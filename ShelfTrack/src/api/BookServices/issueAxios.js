import api from "../axios.js";

// ==============================
// B1 - Issue Book
// ==============================
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


// ==============================
// B2 - Return Book
// ==============================
export const returnBook = async (issueRecordId) => {
  const response = await api.post(
    `/Issue/${issueRecordId}/return`
  );

  return response.data;
};


// ==============================
// Get Issue Details
// ==============================
export const getIssue = async (issueRecordId) => {
  const response = await api.get(
    `/Issue/${issueRecordId}`
  );

  return response.data;
};