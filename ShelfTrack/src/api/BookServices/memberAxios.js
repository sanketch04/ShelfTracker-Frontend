import api from "../axios.js";

export const getAllMembers = async (
  search = "",
  status = null,
  pageNumber = 1,
  pageSize = 10
) => {
  const params = {
    search,
    pageNumber,
    pageSize,
  };

  if (status !== null) {
    params.status = status;
  }

  const response = await api.get("/Members", {
    params,
  });

  return response.data;
};