const BookFilters = ({
  searchTerm = "",
  selectedCategory = "",
  categories = [],
  onSearchChange,
  onCategoryChange,
  onAddBook,
}) => {
  const categoryList = Array.isArray(categories) ? categories : [];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-white p-4">
      <div className="flex flex-1 flex-wrap items-center gap-3">
        <div className="relative w-full max-w-xl">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg
              className="h-4 w-4"
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
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50/50 py-2 pl-9 pr-3 text-xs transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange?.(e.target.value)}
            className="cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50/50 py-2 pl-3 pr-8 text-xs font-medium text-gray-600 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">All Categories</option>
            {categoryList.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-400">
            <svg
              className="h-3.5 w-3.5"
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
        type="button"
        onClick={onAddBook}
        className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-700"
      >
        <span>+</span>
        Add New Book
      </button>
    </div>
  );
};

export default BookFilters;
