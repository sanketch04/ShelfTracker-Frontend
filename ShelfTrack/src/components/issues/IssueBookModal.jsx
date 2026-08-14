import { useEffect, useState } from "react";

import { issueBook } from "../../api/IssueServices/issueAxios";
import { getAllMembers } from "../../api/MemberServices/memberAxios";
import {
  getAvailableBookCopies,
} from "../../api/BookServices/bookAxios";

const IssueBookModal = ({
  isOpen,
  book,
  onClose,
  onSuccess,
}) => {
  const [members, setMembers] = useState([]);
  const [bookCopies, setBookCopies] = useState([]);

  const [memberId, setMemberId] = useState("");
  const [bookCopyId, setBookCopyId] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  

  useEffect(() => {
    if (!isOpen || !book) return;

    loadData();
  }, [isOpen, book]);

  const loadData = async () => {
    try {
      setError("");

      const memberResponse = await getAllMembers();

      setMembers(
        Array.isArray(memberResponse)
          ? memberResponse
          : memberResponse.items || []
      );

      const copiesResponse = await getAvailableBookCopies(book.id);

      console.log("AVAILABLE BOOK COPIES:", copiesResponse);

      setBookCopies(
        Array.isArray(copiesResponse)
          ? copiesResponse
          : copiesResponse.items || []
      );

    } catch (error) {
      console.error(error);

      setError(
        "Unable to load members or available book copies."
      );
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

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

      onSuccess?.();

      onClose();

    } catch (error) {
      console.error(error);

      setError(
        error?.response?.data?.message ||
        "Failed to issue book."
      );
    } finally {
      setLoading(false);
    }
  };

  

  if (!isOpen) {
    return null;
  }

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        {/* TITLE */}

        <h2 className="text-lg font-semibold text-gray-800">
          Issue Book
        </h2>



        <div className="mt-4 rounded-lg bg-gray-50 p-3">

          <p className="text-xs text-gray-400">
            Book
          </p>

          <p className="mt-1 font-semibold text-gray-800">
            {book?.title}
          </p>

          <p className="text-xs text-gray-500">
            ISBN: {book?.isbn}
          </p>

        </div>

        <form onSubmit={handleSubmit}>

         

          <div className="mt-4">

            <label className="mb-1 block text-sm font-medium text-gray-700">
              Member
            </label>

            <select
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              disabled={loading}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
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

          

          <div className="mt-4">

            <label className="mb-1 block text-sm font-medium text-gray-700">
              Book Copy
            </label>

            <select
              value={bookCopyId}
              onChange={(e) => setBookCopyId(e.target.value)}
              disabled={loading}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            >

              <option value="">
                Select available copy
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


            {bookCopies.length === 0 && (
              <p className="mt-1 text-xs text-red-500">
                No available copies for this book.
              </p>
            )}

          </div>



          <div className="mt-4">

            <label className="mb-1 block text-sm font-medium text-gray-700">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              disabled={loading}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />

            <p className="mt-1 text-xs text-gray-400">
              Leave empty to use the default 14 days.
            </p>

          </div>

        

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          

          <div className="mt-6 flex justify-end gap-2">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || bookCopies.length === 0}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? "Issuing..." : "Issue Book"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default IssueBookModal;