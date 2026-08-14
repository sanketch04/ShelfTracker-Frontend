const MemberTable = ({ members, loading, onEdit, onDelete }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm">
       
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

        
        <tbody>
        
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
          
            <tr>
              <td
                colSpan="7"
                className="border-b border-gray-200 px-6 py-12 text-center text-gray-500"
              >
                No members found.
              </td>
            </tr>
          ) : (
          
            members.map((member, index) => (
              <tr
                key={member.id}
                className="border-b border-gray-200 transition hover:bg-gray-50"
              >
              
                <td className="border-r border-gray-200 px-6 py-4 text-gray-500">
                  {index + 1}
                </td>

               
                <td className="border-r border-gray-200 px-6 py-4">
                  <div className="flex items-center gap-3">
                   
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                      {member.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <span className="font-medium text-gray-800">
                      {member.name}
                    </span>
                  </div>
                </td>

                
                <td className="border-r border-gray-200 px-6 py-4 text-gray-600">
                  {member.email}
                </td>

             
                <td className="border-r border-gray-200 px-6 py-4 text-gray-600">
                  {member.phoneNumber || "-"}
                </td>

             
                <td className="border-r border-gray-200 px-6 py-4 text-gray-600">
                  {member.gender === 0
                    ? "Male"
                    : member.gender === 1
                      ? "Female"
                      : "Other"}
                </td>

                
                <td className="border-r border-gray-200 px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${member.status === 0
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${member.status === 0 ? "bg-green-600" : "bg-gray-500"
                        }`}
                    ></span>

                    {member.status === 0 ? "Active" : "Inactive"}
                  </span>
                </td>

                
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                   
                    <button
                      type="button"
                      onClick={() => onEdit(member)}
                      className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition-all duration-200 hover:border-blue-300 hover:bg-blue-100 hover:text-blue-700"
                    >
                      Edit
                    </button>

                  
                    <button
                      type="button"
                      onClick={() => onDelete(member.id)}
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-100 hover:text-red-700"
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

export default MemberTable;