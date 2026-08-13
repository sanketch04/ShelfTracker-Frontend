const BookFormModal = ({
  isOpen,
  editingBookId,
  formData,
  categories = [],
  onChange,
  onSubmit,
  onClose,
}) => {
  if (!isOpen) return null;

  const categoryList = Array.isArray(categories) ? categories : [];
  const isEditing = Boolean(editingBookId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-base font-bold text-gray-800">
            {isEditing ? "Edit Book" : "Add New Book"}
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={onSubmit}
          className="max-h-[75vh] overflow-y-auto px-6 py-5"
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Book title"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Short description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                  ISBN
                </label>
                <input
                  type="text"
                  name="isbn"
                  required
                  value={formData.isbn}
                  onChange={onChange}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="978-..."
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                  Category
                </label>
                <select
                  name="categoryId"
                  required
                  value={formData.categoryId}
                  onChange={onChange}
                  className="w-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">Select category</option>
                  {categoryList.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                  Author Name
                </label>
                <input
                  type="text"
                  name="authorName"
                  required
                  value={formData.authorName}
                  onChange={onChange}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Author name"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                  Total Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  min="0"
                  required
                  value={formData.stock}
                  onChange={onChange}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="0"
                />
                {isEditing && (
                  <p className="mt-1 text-[11px] text-gray-400">
                    Total copies owned. Can't be set below the number currently
                    issued.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-xs font-medium text-white shadow-sm shadow-blue-500/20 transition hover:bg-blue-700"
            >
              {isEditing ? "Update Book" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;
