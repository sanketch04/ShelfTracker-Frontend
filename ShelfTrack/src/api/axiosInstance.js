import api from "./axios";

export const getAllBooks = async (
  search = "",
  categoryName = "",
  status = null,
  sortBy = "",
  sortOrder = "asc",
  pageNumber = 1,
  pageSize = 10,
) => {
  const response = await api.get("/Books", {
    params: {
      search,
      categoryName,
      status,
      sortBy,
      sortOrder,
      pageNumber,
      pageSize,
    },
  });
  return response.data;
};

export const getBookById = async (id) => {
  const response = await api.get(`/Books/${id}`);
  return response.data;
};

export const createBook = async (
  title,
  description = "",
  isbn,
  categoryId,
  authorName,
  stock = 0,
) => {
  const response = await api.post(
    "/Books",
    {
      title,
      description,
      isbn,
      categoryId: Number(categoryId),
      authorName,
      stock: Number(stock),
    },
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.data;
};

export const updateBook = async (
  id,
  title,
  description = "",
  isbn,
  categoryId,
  authorName,
  stock = 0,
) => {
  const response = await api.put(
    `/Books/${id}`,
    {
      id,
      title,
      description,
      isbn,
      categoryId: Number(categoryId),
      authorName,
      stock: Number(stock),
    },
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/Books/${id}`);
  return response.data;
};
