const MemberTable = ({ members, loading, onEdit, onDelete }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm">
        {/* HEADER */}
        <thead className="bg-gray-50">
          <tr className="border-b border-gray-200">
            <th className="whitespace-nowrap border-r border-gray-200 px-6 py-4 font-semibold text-gray-600">
              #
            </th>

            <th className="whitespace-nowrap border-r border-gray-200 px-6 py-4 font-semibold text-gray-600">
              Name
            </th>

            <th className="whitespace-nowrap border-r border-gray-200 px-6 py-4 font-semibold text-gray-600">
              Email
            </th>

            <th className="whitespace-nowrap border-r border-gray-200 px-6 py-4 font-semibold text-gray-600">
              Phone
            </th>

            <th className="whitespace-nowrap border-r border-gray-200 px-6 py-4 font-semibold text-gray-600">
              Gender
            </th>

            <th className="whitespace-nowrap border-r border-gray-200 px-6 py-4 font-semibold text-gray-600">
              Status
            </th>

            <th className="whitespace-nowrap px-6 py-4 text-center font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {/* LOADING */}
          {loading ? (
            <tr>
              <td
                colSpan="7"
                className="border-b border-gray-200 px-6 py-12 text-center text-gray-500"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>

                  <span>Loading members...</span>
                </div>
              </td>
            </tr>
          ) : members.length === 0 ? (
            /* NO DATA */
            <tr>
              <td
                colSpan="7"
                className="border-b border-gray-200 px-6 py-12 text-center text-gray-500"
              >
                No members found.
              </td>
            </tr>
          ) : (
            /* DATA */
            members.map((member, index) => (
              <tr
                key={member.id}
                className="border-b border-gray-200 transition hover:bg-gray-50"
              >
                {/* NUMBER */}
                <td className="border-r border-gray-200 px-6 py-4 text-gray-500">
                  {index + 1}
                </td>

                {/* NAME */}
                <td className="border-r border-gray-200 px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                      {member.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <span className="font-medium text-gray-800">
                      {member.name}
                    </span>
                  </div>
                </td>

                {/* EMAIL */}
                <td className="border-r border-gray-200 px-6 py-4 text-gray-600">
                  {member.email}
                </td>

                {/* PHONE */}
                <td className="border-r border-gray-200 px-6 py-4 text-gray-600">
                  {member.phoneNumber || "-"}
                </td>

                {/* GENDER */}
                <td className="border-r border-gray-200 px-6 py-4 text-gray-600">
                  {member.gender === 0
                    ? "Male"
                    : member.gender === 1
                      ? "Female"
                      : "Other"}
                </td>

                {/* STATUS */}
                <td className="border-r border-gray-200 px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                      member.status === 0
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {/* Status dot */}
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        member.status === 0 ? "bg-green-600" : "bg-gray-500"
                      }`}
                    ></span>

                    {member.status === 0 ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    {/* EDIT */}
                    <button
                      type="button"
                      onClick={() => onEdit(member)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
                    >
                      {/* Edit Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-9.5a2.121 2.121 0 013 3L12 16l-4 1 1-4 9.5-9.5z"
                        />
                      </svg>
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      type="button"
                      onClick={() => onDelete(member.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      {/* Delete Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-8 0h10"
                        />
                      </svg>
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

export default MemberTable;
