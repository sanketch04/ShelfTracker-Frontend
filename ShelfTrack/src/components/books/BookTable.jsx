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
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[850px] border-collapse text-left text-xs">
        <thead>
          <tr className="border-y border-gray-100 bg-gray-50/80 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
            <th className="px-3 py-2.5">ID</th>
            <th className="px-3 py-2.5">Book Details</th>
            <th className="px-3 py-2.5">ISBN</th>
            <th className="px-3 py-2.5">Category</th>
            <th className="px-3 py-2.5">Author</th>
            <th className="px-3 py-2.5 text-center">Total</th>
            <th className="px-3 py-2.5 text-center">Available</th>
            <th className="px-3 py-2.5 text-center">Issued</th>
            <th className="px-3 py-2.5 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 text-xs text-gray-600">
          {loading ? (
            <tr>
              <td colSpan="9" className="py-8 text-center text-gray-500">
                Loading books...
              </td>
            </tr>
          ) : bookList.length === 0 ? (
            <tr>
              <td colSpan="9" className="py-8 text-center text-gray-500">
                No books found.
              </td>
            </tr>
          ) : (
            bookList.map((book) => (
              <tr
                key={book.id}
                className="h-12 transition-colors hover:bg-gray-50"
              >
                {/* ID */}
                <td className="whitespace-nowrap px-3 py-2 text-gray-500">
                  {book.id}
                </td>

                {/* Book Details */}
                <td className="max-w-[220px] px-3 py-2">
                  <div className="truncate text-xs font-semibold text-gray-800">
                    {book.title}
                  </div>

                  <div
                    title={book.description || ""}
                    className="mt-0.5 truncate text-[10px] text-gray-400"
                  >
                    {truncateDescription(book.description)}
                  </div>
                </td>

                {/* ISBN */}
                <td className="whitespace-nowrap px-3 py-2 font-mono text-[10px] text-gray-600">
                  {book.isbn}
                </td>

                {/* Category */}
                <td className="max-w-[120px] truncate px-3 py-2 text-xs">
                  {book.categoryName || "-"}
                </td>

                {/* Author */}
                <td className="max-w-[120px] truncate px-3 py-2 text-xs font-medium text-gray-700">
                  {book.authorName || "-"}
                </td>

                {/* Total */}
                <td className="whitespace-nowrap px-3 py-2 text-center text-xs font-medium text-gray-800">
                  {book.totalStock ?? 0}
                </td>

                {/* Available */}
                <td className="whitespace-nowrap px-3 py-2 text-center">
                  <span className="inline-flex min-w-7 items-center justify-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-emerald-50 text-emerald-700">
                    {book.availableStock ?? 0}
                  </span>
                </td>

                {/* Issued */}
                <td className="whitespace-nowrap px-3 py-2 text-center">
                  <span className="inline-flex min-w-7 items-center justify-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-amber-50 text-amber-700">
                    {book.issuedStock ?? 0}
                  </span>
                </td>

                {/* Actions */}
                <td className="whitespace-nowrap px-3 py-2">
                  <div className="flex justify-center gap-1">
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
                      className="rounded px-2 py-1 text-[10px] font-medium text-blue-600 transition hover:bg-blue-50"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(book.id)}
                      className="rounded px-2 py-1 text-[10px] font-medium text-rose-600 transition hover:bg-rose-50"
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