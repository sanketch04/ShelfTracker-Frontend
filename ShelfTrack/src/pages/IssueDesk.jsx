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
  getIssueHistory,
} from "../api/BookServices/bookAxios";

import { getAllMembers } from "../api/MemberServices/memberAxios";

import {
  issueBook,
  returnBook,
} from "../api/IssueServices/issueAxios";

const IssueDesk = () => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [bookCopies, setBookCopies] = useState([]);
  const [issueHistory, setIssueHistory] = useState([]);

  const [bookId, setBookId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [bookCopyId, setBookCopyId] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [copyLoading, setCopyLoading] = useState(false);
  const [returningId, setReturningId] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    loadInitialData();
    loadIssueHistory();
  }, []);

  const loadInitialData = async () => {
    try {
      setError("");
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

      setError("Unable to load books or members.");
    }
  };
  const loadIssueHistory = async () => {
    try {
      const response = await getIssueHistory({
        pageNumber: 1,
        pageSize: 100,
      });

      console.log("ISSUE HISTORY:", response);

      setIssueHistory(response?.items || []);
    } catch (error) {
      console.error("Issue History Load Error:", error);

      toast.error("Unable to load issue history.");
    }
  };
  const handleBookChange = async (e) => {
    const selectedBookId = e.target.value;

    setBookId(selectedBookId);
    setBookCopyId("");
    setBookCopies([]);

    if (!selectedBookId) {
      return;
    }

    try {
      setCopyLoading(true);
      setError("");

      const response =
        await getAvailableBookCopies(selectedBookId);

      console.log(
        "AVAILABLE BOOK COPIES:",
        response
      );

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
  const handleIssueBook = async (e) => {
    e.preventDefault();

    setError("");
    if (!bookId) {
      setError("Please select a book.");
      return;
    }

    if (!memberId) {
      setError("Please select a member.");
      return;
    }

    if (!bookCopyId) {
      setError("Please select a book copy.");
      return;
    }

    try {
      setLoading(true);

      await issueBook({
        bookCopyId: Number(bookCopyId),
        memberId: Number(memberId),
        dueDate: dueDate || null,
      });

      toast.success("Book issued successfully!");
      setBookId("");
      setMemberId("");
      setBookCopyId("");
      setDueDate("");
      setBookCopies([]);

      await loadIssueHistory();
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
  const handleReturn = async (issueRecordId) => {
    try {
      setReturningId(issueRecordId);
      setError("");
      await returnBook(issueRecordId);

      toast.success("Book returned successfully!");

      await loadIssueHistory();
    } catch (error) {
      console.error(
        "Return Book Error:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Failed to return book.";

      setError(message);

      toast.error(message);
    } finally {
      setReturningId(null);
    }
  };

  const activeIssues = issueHistory.filter(
    (issue) => !issue.isReturned
  );

  return (
    <div className="w-full p-6">

      {}

      <div className="mb-5">

        <h1 className="text-2xl font-semibold text-gray-800">
          Issue Desk
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Issue and return library books
        </p>

      </div>
      {

      }

      <div className="max-w-2xl rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

        <form onSubmit={handleIssueBook}>

          {

          }

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

          {

          }
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
          {

          }
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
                disabled={
                  !bookId ||
                  copyLoading ||
                  bookCopies.length === 0
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
          {

          }
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
          {

          }
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
          {

          }

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
      {

      }
      <div className="mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

        {/* HEADER */}

        <div className="mb-5 flex items-center justify-between">

          <div>

            <h2 className="text-lg font-semibold text-gray-800">
              Active Issues
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Books currently issued to members
            </p>

          </div>

          <div className="rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500">
            {activeIssues.length} Active
          </div>

        </div>
        {activeIssues.length === 0 ? (

          <div className="rounded-lg border border-dashed border-gray-200 py-10 text-center">

            <BookOpen
              size={28}
              className="mx-auto text-gray-300"
            />

            <p className="mt-3 text-sm font-medium text-gray-600">
              No active issues
            </p>

            <p className="mt-1 text-xs text-gray-400">
              All issued books have been returned.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[760px] text-left">

              <thead>

                <tr className="border-b border-gray-100">

                  <th className="px-4 py-3 text-xs font-medium text-gray-500">
                    BOOK
                  </th>

                  <th className="px-4 py-3 text-xs font-medium text-gray-500">
                    MEMBER
                  </th>

                  <th className="px-4 py-3 text-xs font-medium text-gray-500">
                    ISSUE DATE
                  </th>

                  <th className="px-4 py-3 text-xs font-medium text-gray-500">
                    DUE DATE
                  </th>

                  <th className="px-4 py-3 text-xs font-medium text-gray-500">
                    STATUS
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">
                    ACTION
                  </th>

                </tr>

              </thead>


              <tbody>

                {activeIssues.map((issue) => (

                  <tr
                    key={issue.issueRecordId}
                    className="border-b border-gray-50 last:border-0"
                  >

                    <td className="px-4 py-4">

                      <div className="flex items-center gap-3">

                        <div className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-blue-50
                          text-blue-600
                        ">

                          <BookOpen size={17} />

                        </div>

                        <span className="text-sm font-medium text-gray-800">
                          {issue.bookTitle || "Unknown Book"}
                        </span>

                      </div>

                    </td>

                    <td className="px-4 py-4">

                      <div className="flex items-center gap-2">

                        <UserRound
                          size={16}
                          className="text-gray-400"
                        />

                        <span className="text-sm text-gray-600">
                          {issue.memberName || "Unknown Member"}
                        </span>

                      </div>

                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">

                      {issue.issuedAt
                        ? new Date(
                            issue.issuedAt
                          ).toLocaleDateString()
                        : "-"}

                    </td>

                    <td className="px-4 py-4">

                      <div className="flex items-center gap-2">

                        <CalendarDays
                          size={15}
                          className="text-gray-400"
                        />

                        <span className="text-sm text-gray-600">
                          {issue.dueDate
                            ? new Date(
                                issue.dueDate
                              ).toLocaleDateString()
                            : "-"}
                        </span>

                      </div>

                    </td>

                    <td className="px-4 py-4">

                      {issue.isOverdue ? (

                        <span className="
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-full
                          bg-red-50
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-red-600
                        ">

                          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

                          Overdue

                        </span>

                      ) : (

                        <span className="
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-full
                          bg-orange-50
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-orange-600
                        ">

                          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

                          Issued

                        </span>

                      )}

                    </td>

                    <td className="px-4 py-4 text-right">

                      <button
                        type="button"
                        onClick={() =>
                          handleReturn(
                            issue.issueRecordId
                          )
                        }
                        disabled={
                          returningId ===
                          issue.issueRecordId
                        }
                        className="
                          rounded-lg
                          border
                          border-gray-200
                          bg-white
                          px-3
                          py-1.5
                          text-xs
                          font-medium
                          text-gray-700
                          transition
                          hover:border-blue-200
                          hover:bg-blue-50
                          hover:text-blue-600
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >

                        {returningId ===
                        issue.issueRecordId
                          ? "Returning..."
                          : "Return"}

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default IssueDesk;