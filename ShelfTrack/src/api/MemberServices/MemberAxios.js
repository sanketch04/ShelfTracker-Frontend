import api from "../axios.js";

// GET ALL MEMBERS
// Search + Pagination
export const getAllMembers = async (
  search = "",
  pageNumber = 1,
  pageSize = 10
) => {
  const params = {
    search,
    pageNumber,
    pageSize,
  };

  const response = await api.get("/Members", {
    params,
  });

  return response.data;
};


// GET MEMBER BY ID
export const getMemberById = async (id) => {
  const response = await api.get(`/Members/${id}`);

  return response.data;
};


// CREATE MEMBER
export const createMember = async ({
  name,
  email,
  phoneNumber,
  gender,
  status,
}) => {
  const response = await api.post("/Members", {
    name,
    email,
    phoneNumber,
    gender,
    status,
  });

  return response.data;
};


// UPDATE MEMBER
export const updateMember = async (
  id,
  {
    name,
    email,
    phoneNumber,
    gender,
    status,
  }
) => {
  const response = await api.put(`/Members/${id}`, {
    name,
    email,
    phoneNumber,
    gender,
    status,
  });

  return response.data;
};


// DELETE MEMBER
export const deleteMember = async (id) => {
  const response = await api.delete(`/Members/${id}`);

  return response.data;
};