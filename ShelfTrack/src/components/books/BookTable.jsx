const BookTable = ({
  books = [],
  loading = false,
  onEdit,
  onDelete,
  onIssue,
}) => {
  const truncateDescription = (text) => {
    if (!text) return "No description provided";

    const words = text.trim().split(/\s+/);

    if (words.length > 4) {
      return `${words.slice(0, 4).join(" ")}...`;
    }

    return text;
  };

  const bookList = Array.isArray(books) ? books : [];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px] border-collapse text-left">
        <thead>
          <tr className="border-y border-gray-100 bg-gray-50/80 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            <th className="px-5 py-4">ID</th>
            <th className="px-5 py-4">Book Details</th>
            <th className="px-5 py-4">ISBN</th>
            <th className="px-5 py-4">Category</th>
            <th className="px-5 py-4">Author</th>
            <th className="px-5 py-4 text-center">Total</th>
            <th className="px-5 py-4 text-center">Available</th>
            <th className="px-5 py-4 text-center">Issued</th>
            <th className="px-5 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
          {loading ? (
            <tr>
              <td colSpan="9" className="py-16 text-center text-gray-500">
                Loading books...
              </td>
            </tr>
          ) : bookList.length === 0 ? (
            <tr>
              <td colSpan="9" className="py-16 text-center text-gray-500">
                No books found.
              </td>
            </tr>
          ) : (
            bookList.map((book) => (
              <tr key={book.id} className="transition-colors hover:bg-gray-50">
                <td className="whitespace-nowrap px-5 py-4 text-gray-500">
                  {book.id}
                </td>

                <td className="min-w-[280px] px-5 py-4">
                  <div className="font-semibold text-gray-800">
                    {book.title}
                  </div>

                  <div
                    title={book.description || ""}
                    className="mt-1 text-xs text-gray-400"
                  >
                    {truncateDescription(book.description)}
                  </div>
                </td>

                <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-gray-600">
                  {book.isbn}
                </td>

                <td className="px-5 py-4">{book.categoryName || "-"}</td>

                <td className="px-5 py-4 font-medium text-gray-700">
                  {book.authorName || "-"}
                </td>

                <td className="px-5 py-4 text-center font-medium text-gray-800">
                  {book.totalStock ?? 0}
                </td>

                <td className="px-5 py-4 text-center">
                  <span className="inline-flex min-w-9 items-center justify-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                    {book.availableStock ?? 0}
                  </span>
                </td>

                <td className="px-5 py-4 text-center">
                  <span className="inline-flex min-w-9 items-center justify-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                    {book.issuedStock ?? 0}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onIssue(book)}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-emerald-600 transition hover:bg-emerald-50"
                    >
                      Issue
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(book)}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(book.id)}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-rose-600 transition hover:bg-rose-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
