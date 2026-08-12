import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../api/axiosInstance";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Form Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookId, setEditingBookId] = useState(null);

  // Delete Confirmation Modal State
  const [deletingBookId, setDeletingBookId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isbn: "",
    categoryId: 1,
    authorName: "",
    stock: 0,
  });

  // Helper function to truncate description to 4 words max
  const truncateDescription = (text) => {
    if (!text) return "No description provided";
    const words = text.trim().split(/\s+/);
    if (words.length > 4) {
      return words.slice(0, 4).join(" ") + "...";
    }
    return text;
  };

  const dynamicCategories = [
    ...new Set(books.map((b) => b.categoryName).filter((cat) => Boolean(cat))),
  ];

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await getAllBooks(
        searchTerm.trim(),
        selectedCategory,
        null,
        "",
        "asc",
        pageNumber,
        pageSize,
      );

      setBooks(data.items || []);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.totalCount || 0);
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, selectedCategory, pageNumber]);

  // Direct metrics mapping from API response items
  const issuedBooksCount = books.reduce(
    (acc, b) => acc + (b.issuedStock || 0),
    0,
  );
  const availableBooksCount = books.reduce(
    (acc, b) => acc + (b.availableStock || 0),
    0,
  );
  const totalStockCount = books.reduce(
    (acc, b) => acc + (b.totalStock || 0),
    0,
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "categoryId" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleOpenAddModal = () => {
    setEditingBookId(null);
    setFormData({
      title: "",
      description: "",
      isbn: "",
      categoryId: 1,
      authorName: "",
      stock: 0,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (book) => {
    setEditingBookId(book.id);
    setFormData({
      title: book.title || "",
      description: book.description || "",
      isbn: book.isbn || "",
      categoryId: book.categoryId || 1,
      authorName: book.authorName || "",
      stock: book.totalStock ?? book.stock ?? 0,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBookId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBookId) {
        await updateBook(
          editingBookId,
          formData.title,
          formData.description,
          formData.isbn,
          formData.categoryId,
          formData.authorName,
          formData.stock,
        );
        toast.success("Book updated successfully!");
      } else {
        await createBook(
          formData.title,
          formData.description,
          formData.isbn,
          formData.categoryId,
          formData.authorName,
          formData.stock,
        );
        toast.success("Book added successfully!");
      }
      handleCloseModal();
      fetchBooks();
    } catch (error) {
      console.error("Error saving book:", error);
      toast.error(
        error?.response?.data?.message || "Operation failed. Please try again.",
      );
    }
  };

  const confirmDelete = async () => {
    if (!deletingBookId) return;

    try {
      await deleteBook(deletingBookId);
      toast.success("Book deleted successfully!");
      setDeletingBookId(null);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book.");
    }
  };

  return (
    <div className="p-0 space-y-4">
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">
        Manage Books
      </h1>

      <div className="flex flex-wrap gap-3">
        <div className="bg-white rounded-xl shadow-sm p-3.5 w-full sm:w-40 border border-gray-100">
          <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">
            All Books
          </h3>
          <p className="text-2xl font-bold text-blue-600 mt-1">{totalCount}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-3.5 w-full sm:w-40 border border-gray-100">
          <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">
            Issued Books
          </h3>
          <p className="text-2xl font-bold text-amber-500 mt-1">
            {issuedBooksCount}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-3.5 w-full sm:w-40 border border-gray-100">
          <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">
            Available Books
          </h3>
          <p className="text-2xl font-bold text-emerald-600 mt-1">
            {availableBooksCount}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-3.5 w-full sm:w-40 border border-gray-100">
          <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">
            Total Stock
          </h3>
          <p className="text-2xl font-bold text-indigo-600 mt-1">
            {totalStockCount}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden mt-4">
        <div className="p-4 bg-white border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative w-full sm:w-80 md:w-96">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search Title, Author, ISBN..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPageNumber(1);
                }}
                className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-xs w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 transition-all"
              />
            </div>

            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPageNumber(1);
                }}
                className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-xs bg-gray-50/50 text-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all"
              >
                <option value="">All Categories</option>
                {dynamicCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-gray-400">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </div>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg text-xs hover:bg-blue-700 transition-all shadow-sm shadow-blue-500/20 whitespace-nowrap flex items-center gap-1.5"
          >
            <span>+</span> Add New Book
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Book Details</th>
                <th className="py-3 px-4">ISBN</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4 text-center">Total</th>
                <th className="py-3 px-4 text-center">Available</th>
                <th className="py-3 px-4 text-center">Issued</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-600">
              {loading ? (
                <tr>
                  <td colSpan="9" className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <svg
                        className="w-8 h-8 text-blue-600 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="text-xs font-medium text-gray-500 animate-pulse">
                        Fetching books, please wait...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : books.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-gray-400">
                    No books found.
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr
                    key={book.id}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="py-3 px-4 font-semibold text-gray-400">
                      {book.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {book.title}
                      </div>
                      <div
                        title={book.description}
                        className="text-[11px] text-gray-400 mt-0.5"
                      >
                        {truncateDescription(book.description)}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-gray-500">
                      {book.isbn}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[11px] font-medium text-gray-600">
                        {book.categoryName}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700 font-medium">
                      {book.authorName}
                    </td>
                    <td className="py-3 px-4 text-center font-semibold text-gray-800">
                      {book.totalStock}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 rounded">
                        {book.availableStock}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium text-amber-700 bg-amber-50 rounded">
                        {book.issuedStock}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(book)}
                          title="Edit Book"
                          className="p-1.5 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.8"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>

                        <button
                          onClick={() => setDeletingBookId(book.id)}
                          title="Delete Book"
                          className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.8"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div>
            Showing Page{" "}
            <span className="font-semibold text-gray-800">{pageNumber}</span> of{" "}
            <span className="font-semibold text-gray-800">{totalPages}</span>
          </div>
          <div className="flex gap-2">
            <button
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <button
              disabled={pageNumber >= totalPages}
              onClick={() =>
                setPageNumber((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Larger Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4 transition-all">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-gray-100">
            <div className="px-6 py-4 bg-gray-50/80 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="font-bold text-gray-800 text-base">
                  {editingBookId ? "Edit Book" : "Add New Book"}
                </h2>
                <p className="text-[11px] text-gray-400">
                  {editingBookId
                    ? "Update book details in the library registry."
                    : "Fill in information to register a new book."}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200/50 transition-colors text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Clean Code"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  placeholder="Brief summary of the book content..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    ISBN
                  </label>
                  <input
                    type="text"
                    name="isbn"
                    required
                    placeholder="978-XXXXXXX"
                    value={formData.isbn}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Category ID
                  </label>
                  <input
                    type="number"
                    name="categoryId"
                    required
                    min="1"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    name="authorName"
                    required
                    placeholder="e.g. Robert C. Martin"
                    value={formData.authorName}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Total Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-all text-xs"
                >
                  {editingBookId ? "Update Book" : "Create Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingBookId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4 transition-all">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-gray-100 p-5 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 text-base">
                Confirm Deletion
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Are you sure you want to delete this book? This action cannot be
                undone.
              </p>
            </div>

            <div className="flex gap-2 justify-center pt-2">
              <button
                type="button"
                onClick={() => setDeletingBookId(null)}
                className="w-1/2 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="w-1/2 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 shadow-sm transition-all text-xs font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
