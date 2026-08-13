const MemberPagination = ({
  pageNumber,
  totalPages,
  totalCount,
  pageSize,
  onPrevious,
  onNext,
}) => {

  const start =
    totalCount === 0
      ? 0
      : (pageNumber - 1) * pageSize + 1;

  const end = Math.min(
    pageNumber * pageSize,
    totalCount
  );

  return (
    <div className="flex flex-col gap-3 border-t border-gray-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

      <p className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-medium text-gray-700">
          {start}
        </span>{" "}
        -{" "}
        <span className="font-medium text-gray-700">
          {end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-gray-700">
          {totalCount}
        </span>{" "}
        members
      </p>


      <div className="flex items-center gap-2">

        <button
          onClick={onPrevious}
          disabled={pageNumber === 1}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>


        <span className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
          Page {pageNumber} of {totalPages}
        </span>


        <button
          onClick={onNext}
          disabled={pageNumber >= totalPages}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default MemberPagination;