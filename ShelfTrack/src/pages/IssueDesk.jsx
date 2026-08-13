import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  BookOpen,
  UserRound,
  BookCopy,
  CalendarDays,
  CircleAlert,
} from "lucide-react";

import {
  getAllBooks,
  getAvailableBookCopies,
} from "../api/BookServices/bookAxios";

import { getAllMembers } from "../api/MemberServices/memberAxios";

import { issueBook } from "../api/IssueServices/issueAxios";

const IssueDesk = () => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [bookCopies, setBookCopies] = useState([]);

  const [bookId, setBookId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [bookCopyId, setBookCopyId] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [copyLoading, setCopyLoading] = useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // LOAD BOOKS + MEMBERS
  // =====================================================

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setError("");

      // -----------------------------
      // LOAD BOOKS
      // -----------------------------

      const bookResponse = await getAllBooks(
        "",
        "",
        null,
        "",
        "asc",
        1,
        100000
      );

      setBooks(bookResponse?.items || []);

      // -----------------------------
      // LOAD MEMBERS
      // -----------------------------

      const memberResponse = await getAllMembers(
        "",
        1,
        100000
      );

      setMembers(
        Array.isArray(memberResponse)
          ? memberResponse
          : memberResponse?.items || []
      );

    } catch (error) {
      console.error("Issue Desk Load Error:", error);

      setError(
        "Unable to load books or members."
      );
    }
  };

  // =====================================================
  // BOOK CHANGE
  // =====================================================

  const handleBookChange = async (e) => {
    const selectedBookId = e.target.value;

    setBookId(selectedBookId);

    // Reset old copy selection
    setBookCopyId("");
    setBookCopies([]);

    if (!selectedBookId) {
      return;
    }

    try {
      setCopyLoading(true);
      setError("");

      // ---------------------------------------------
      // GET AVAILABLE COPIES FOR SELECTED BOOK
      // ---------------------------------------------

      const response =
        await getAvailableBookCopies(
          selectedBookId
        );

      console.log(
        "AVAILABLE BOOK COPIES:",
        response
      );

      // ---------------------------------------------
      // HANDLE ARRAY / PAGINATED RESPONSE
      // ---------------------------------------------

      setBookCopies(
        Array.isArray(response)
          ? response
          : response?.items || []
      );

    } catch (error) {
      console.error(
        "Book Copy Error:",
        error
      );

      setError(
        "Unable to load available book copies."
      );

      setBookCopies([]);

    } finally {
      setCopyLoading(false);
    }
  };

  // =====================================================
  // ISSUE BOOK
  // =====================================================

  const handleIssueBook = async (e) => {
    e.preventDefault();

    setError("");

    // ---------------------------------------------
    // VALIDATION
    // ---------------------------------------------

    if (!bookId) {
      setError("Please select a book.");
      return;
    }

    if (!memberId) {
      setError("Please select a member.");
      return;
    }

    if (!bookCopyId) {
      setError(
        "Please select a book copy."
      );
      return;
    }

    try {
      setLoading(true);

      // ---------------------------------------------
      // ISSUE API
      // ---------------------------------------------

      await issueBook({
        bookCopyId: Number(bookCopyId),
        memberId: Number(memberId),
        dueDate: dueDate || null,
      });

      toast.success(
        "Book issued successfully!"
      );

      // ---------------------------------------------
      // RESET FORM
      // ---------------------------------------------

      setBookId("");
      setMemberId("");
      setBookCopyId("");
      setDueDate("");
      setBookCopies([]);

    } catch (error) {
      console.error(
        "Issue Book Error:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Failed to issue book.";

      setError(message);

      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="w-full p-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-5">

        <h1 className="text-2xl font-semibold text-gray-800">
          Issue Desk
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Issue a library book to a member
        </p>

      </div>


      {/* =================================================
          ISSUE FORM
      ================================================= */}

      <div className="max-w-2xl rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

        <form onSubmit={handleIssueBook}>

          {/* =================================================
              BOOK
          ================================================= */}

          <div>

            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Book
            </label>

            <div className="relative">

              <BookOpen
                size={17}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <select
                value={bookId}
                onChange={handleBookChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  py-2.5
                  pl-10
                  pr-3
                  text-sm
                  text-gray-700
                  outline-none
                  focus:border-blue-500
                  focus:ring-1
                  focus:ring-blue-500
                "
              >

                <option value="">
                  Select book
                </option>

                {books.map((book) => (

                  <option
                    key={book.id}
                    value={book.id}
                  >
                    {book.title} - {book.isbn}
                  </option>

                ))}

              </select>

            </div>

          </div>


          {/* =================================================
              MEMBER
          ================================================= */}

          <div className="mt-4">

            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Member
            </label>

            <div className="relative">

              <UserRound
                size={17}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <select
                value={memberId}
                onChange={(e) =>
                  setMemberId(e.target.value)
                }
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  py-2.5
                  pl-10
                  pr-3
                  text-sm
                  text-gray-700
                  outline-none
                  focus:border-blue-500
                  focus:ring-1
                  focus:ring-blue-500
                "
              >

                <option value="">
                  Select member
                </option>

                {members.map((member) => (

                  <option
                    key={member.id}
                    value={member.id}
                  >
                    {member.name}
                  </option>

                ))}

              </select>

            </div>

          </div>


          {/* =================================================
              BOOK COPY / ACCESSION NUMBER
          ================================================= */}

          {/* BOOK COPY / ACCESSION NUMBER */}
<div className="mt-4">

  <label className="mb-1.5 block text-sm font-medium text-gray-700">
    Book Copy / Accession Number
  </label>

  <div className="relative">

    <BookCopy
      size={17}
      className="
        absolute
        left-3
        top-1/2
        -translate-y-1/2
        text-gray-400
      "
    />

    <select
      value={bookCopyId}
      onChange={(e) =>
        setBookCopyId(e.target.value)
      }
      disabled={!bookId || copyLoading || bookCopies.length === 0} 
      className="
        w-full
        rounded-lg
        border
        border-gray-200
        bg-white
        py-2.5
        pl-10
        pr-3
        text-sm
        text-gray-700
        outline-none
        disabled:cursor-not-allowed
        disabled:bg-gray-50
        disabled:text-gray-400
        focus:border-blue-500
        focus:ring-1
        focus:ring-blue-500
      "
    >

      <option value="">
        {copyLoading
          ? "Loading available copies..."
          : !bookId
          ? "Select book first"
          : bookCopies.length === 0
          ? "No available copies"
          : "Select book copy"}
      </option>

      {bookCopies.map((copy) => (

        <option
          key={copy.id}
          value={copy.id}
        >
          {copy.accessionNumber}
        </option>

      ))}

    </select>

  </div>

</div>


          {/* =================================================
              DUE DATE
          ================================================= */}

          <div className="mt-4">

            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Due Date
            </label>

            <div className="relative">

              <CalendarDays
                size={17}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(e.target.value)
                }
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  py-2.5
                  pl-10
                  pr-3
                  text-sm
                  text-gray-700
                  outline-none
                  focus:border-blue-500
                  focus:ring-1
                  focus:ring-blue-500
                "
              />

            </div>

            <p className="mt-1 text-xs text-gray-400">
              Leave empty to use the default 14 days.
            </p>

          </div>


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="
              mt-4
              flex
              items-start
              gap-2
              rounded-lg
              bg-red-50
              px-3
              py-2.5
              text-sm
              text-red-600
            ">

              <CircleAlert
                size={17}
                className="mt-0.5 shrink-0"
              />

              <span>
                {error}
              </span>

            </div>

          )}


          {/* =================================================
              BUTTON
          ================================================= */}

          <div className="mt-6 flex justify-end">

            <button
              type="submit"
              disabled={loading}
              className="
                rounded-lg
                bg-blue-600
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                transition
                hover:bg-blue-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              {loading
                ? "Issuing..."
                : "Issue Book"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default IssueDesk;