import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getAllBooks,
  getAllCategories,
  createBook,
  updateBook,
  deleteBook,
} from "../api/BookServices/bookAxios";

import BookFilters from "../components/books/BookFilters";
import BookTable from "../components/books/BookTable";
import BookPagination from "../components/books/BookPagination";
import BookFormModal from "../components/books/BookFormModal";
import DeleteBookModal from "../components/books/DeleteBookModal";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

 
  const [stats, setStats] = useState({
    allBooksCount: 0,
    issuedBooksCount: 0,
    availableBooksCount: 0,
    totalStockCount: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookId, setEditingBookId] = useState(null);
  const [editingBookIssuedStock, setEditingBookIssuedStock] = useState(0);
  const [deletingBookId, setDeletingBookId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isbn: "",
    categoryId: "",
    authorName: "",
    stock: 0,
  });

 
  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();

      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setCategories([]);
      toast.error("Failed to load categories.");
    }
  };


  const fetchStats = async () => {
    try {
      const data = await getAllBooks("", "", null, "", "asc", 1, 100000);

      const items = data?.items || [];

      const issuedBooksCount = items.reduce(
        (total, book) => total + (book.issuedStock || 0),
        0,
      );

      const availableBooksCount = items.reduce(
        (total, book) => total + (book.availableStock || 0),
        0,
      );

      const totalStockCount = items.reduce(
        (total, book) => total + (book.totalStock || 0),
        0,
      );

      setStats({
        allBooksCount: data?.totalCount || 0,
        issuedBooksCount,
        availableBooksCount,
        totalStockCount,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load book statistics.");
    }
  };


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

      setBooks(data?.items || []);
      setTotalCount(data?.totalCount || 0);
      setTotalPages(data?.totalPages || 1);
    } catch (error) {
      console.error(error);

      setBooks([]);
      setTotalCount(0);
      setTotalPages(1);

      toast.error("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCategories();
    fetchStats();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, selectedCategory, pageNumber]);


  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setPageNumber(1);
  };


  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setPageNumber(1);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,

      [name]:
        name === "categoryId" || name === "stock"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };


  const handleOpenAddModal = () => {
    setEditingBookId(null);
    setEditingBookIssuedStock(0);

    setFormData({
      title: "",
      description: "",
      isbn: "",
      categoryId: "",
      authorName: "",
      stock: 0,
    });

    setIsModalOpen(true);
  };


  const handleOpenEditModal = (book) => {
    const matchedCategory = categories.find(
      (category) =>
        category.name?.toLowerCase() === book.categoryName?.toLowerCase(),
    );

    setEditingBookId(book.id);
    setEditingBookIssuedStock(book.issuedStock ?? 0);

    setFormData({
      title: book.title || "",
      description: book.description || "",
      isbn: book.isbn || "",

      categoryId: matchedCategory?.id || "",

      authorName: book.authorName || "",
      stock: book.totalStock ?? 0,
    });

    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBookId(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.categoryId) {
      toast.error("Please select a category.");
      return;
    }

    if (editingBookId && Number(formData.stock) < editingBookIssuedStock) {
      toast.error(
        `Stock cannot be less than issued stock. Currently ${editingBookIssuedStock} ${
          editingBookIssuedStock === 1 ? "copy is" : "copies are"
        } issued.`,
      );
      return;
    }

    try {
      if (editingBookId) {
        await updateBook(editingBookId, {
          title: formData.title,
          description: formData.description,
          isbn: formData.isbn,
          categoryId: formData.categoryId,
          authorName: formData.authorName,
          stock: formData.stock,
        });

        toast.success("Book updated successfully!");
      } else {
        await createBook({
          title: formData.title,
          description: formData.description,
          isbn: formData.isbn,
          categoryId: formData.categoryId,
          authorName: formData.authorName,
          stock: formData.stock,
        });

        toast.success("Book added successfully!");
      }

      handleCloseModal();
      await fetchBooks();
      await fetchStats();
    } catch (error) {
      console.error(error);

      const serverMessage = error?.response?.data?.message;
      const status = error?.response?.status;

      if (serverMessage) {
        toast.error(serverMessage);
      } else if (status === 500) {
        toast.error(
          "Operation failed. This ISBN may already be in use, or the stock change isn't allowed.",
        );
      } else {
        toast.error("Operation failed. Please try again.");
      }
    }
  };


  const handleDelete = async () => {
    if (!deletingBookId) return;

    try {
      await deleteBook(deletingBookId);

      toast.success("Book deleted successfully!");

      setDeletingBookId(null);

      if (books.length === 1 && pageNumber > 1) {
        setPageNumber((previous) => previous - 1);
      } else {
        await fetchBooks();
      }

      await fetchStats();
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Failed to delete book.");
    }
  };


  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((previous) => previous - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber((previous) => previous + 1);
    }
  };


  return (
    <div className="space-y-5 p-0">
      <h1 className="text-center text-2xl font-bold text-gray-800">
        Manage Books
      </h1>

      <div className="flex flex-wrap gap-4">
        <div className="w-full rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:w-48">
          <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400">
            All Books
          </h3>
          <p className="mt-2 text-2xl font-bold text-blue-600">
            {stats.allBooksCount}
          </p>
        </div>

        <div className="w-full rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:w-48">
          <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Issued Books
          </h3>
          <p className="mt-2 text-2xl font-bold text-amber-500">
            {stats.issuedBooksCount}
          </p>
        </div>

        <div className="w-full rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:w-48">
          <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Available Books
          </h3>
          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {stats.availableBooksCount}
          </p>
        </div>

        <div className="w-full rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:w-48">
          <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Total Stock
          </h3>
          <p className="mt-2 text-2xl font-bold text-indigo-600">
            {stats.totalStockCount}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <BookFilters
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          categories={categories}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onAddBook={handleOpenAddModal}
        />

        <BookTable
          books={books}
          loading={loading}
          onEdit={handleOpenEditModal}
          onDelete={setDeletingBookId}
        />

        <BookPagination
          pageNumber={pageNumber}
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={pageSize}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
        />
      </div>

      <BookFormModal
        isOpen={isModalOpen}
        editingBookId={editingBookId}
        formData={formData}
        categories={categories}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
      />

      <DeleteBookModal
        deletingBookId={deletingBookId}
        onCancel={() => setDeletingBookId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ManageBooks;
