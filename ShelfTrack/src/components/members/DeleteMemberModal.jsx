const DeleteMemberModal = ({
  deletingMemberId,
  onCancel,
  onConfirm,
}) => {

  if (!deletingMemberId) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onCancel}
    >

      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">

          <h2 className="text-lg font-semibold text-gray-800">
            Delete Member
          </h2>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            ✕
          </button>

        </div>


        {/* Body */}
        <div className="px-6 py-6">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m0 3.75h.007M10.29 3.86l-7.04 12.18A1.5 1.5 0 004.55 18.3h14.9a1.5 1.5 0 001.3-2.26L13.71 3.86a1.5 1.5 0 00-2.6 0z"
                />
              </svg>

            </div>


            <div>

              <h3 className="text-base font-semibold text-gray-800">
                Are you sure?
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Are you sure you want to delete this member?
                This action cannot be undone.
              </p>

            </div>

          </div>

        </div>


        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>


          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Delete Member
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteMemberModal;