import React from "react";

const Dashboard = () => {
  return (
    <div className="p-0">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="flex flex-wrap gap-4">
        <div className="bg-white rounded-lg shadow-md p-3 w-full sm:w-40 border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">All Books</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
