const BookPagination = ({
  pageNumber = 1,
  totalPages = 1,
  totalCount = 0,
  pageSize = 10,
  onPrevious,
  onNext,
}) => {
  const startRecord = totalCount === 0 ? 0 : (pageNumber - 1) * pageSize + 1;
  const endRecord = Math.min(pageNumber * pageSize, totalCount);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 bg-white px-5 py-4 text-sm">
      <div className="text-gray-500">
        {totalCount === 0
          ? "No records"
          : `Showing ${startRecord}-${endRecord} of ${totalCount} books`}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={onPrevious}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-500">
          Page {pageNumber} of {totalPages}
        </span>

        <button
          type="button"
          disabled={pageNumber >= totalPages}
          onClick={onNext}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookPagination;
