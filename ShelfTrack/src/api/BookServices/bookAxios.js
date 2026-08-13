import api from "../axios.js";

export const getAllBooks = async (
  search = "",
  categoryName = "",
  authorId = null,
  sortBy = "",
  sortOrder = "asc",
  pageNumber = 1,
  pageSize = 10,
) => {
  const params = {
    search,
    categoryName,
    sortBy,
    sortOrder,
    pageNumber,
    pageSize,
  };

  if (authorId !== null) {
    params.authorId = authorId;
  }

  const response = await api.get("/Books", {
    params,
  });

  return response.data;
};

export const getBookById = async (id) => {
  const response = await api.get(`/Books/${id}`);

  return response.data;
};

export const createBook = async ({
  title,
  description,
  isbn,
  categoryId,
  authorName,
  stock,
}) => {
  const response = await api.post("/Books", {
    title,
    description,
    isbn,
    categoryId: Number(categoryId),
    authorName,
    stock: Number(stock),
  });

  return response.data;
};

export const updateBook = async (
  id,
  { title, description, isbn, categoryId, authorName, stock },
) => {
  const response = await api.put(`/Books/${id}`, {
    title,
    description,
    isbn,
    categoryId: Number(categoryId),
    authorName,
    stock: Number(stock),
  });

  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/Books/${id}`);

  return response.data;
};

export const getAllCategories = async () => {
  const response = await api.get("/Categories");

  return response.data;
};
// GET AVAILABLE BOOK COPIES FOR ISSUE
export const getAvailableBookCopies = async (bookId) => {
  const response = await api.get("/BookCopies/available", {
    params: {
      bookId,
    },
  });

  return response.data;
};
