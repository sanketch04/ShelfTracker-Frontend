const DeleteBookModal = ({ deletingBookId, onCancel, onConfirm }) => {
  if (!deletingBookId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-xl">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h3 className="mt-4 text-base font-bold text-gray-800">
          Confirm Deletion
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-gray-500">
          Are you sure you want to delete this book? This action cannot be
          undone.
        </p>

        <div className="mt-5 flex justify-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-1/2 rounded-lg border border-gray-200 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="w-1/2 rounded-lg bg-rose-600 py-2 text-xs font-medium text-white transition hover:bg-rose-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookModal;
