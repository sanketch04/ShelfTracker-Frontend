import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getAllBooks } from "../api/BookServices/bookAxios";

const Dashboard = () => {
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTotalBooks = async () => {
      setLoading(true);

      try {
        const data = await getAllBooks("", "", null, "", "asc", 1, 1);

        setTotalBooks(data?.totalCount || 0);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load book count.");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalBooks();
  }, []);

  return (
    <div className="p-0">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="flex flex-wrap gap-4">
        <div className="bg-white rounded-lg shadow-md p-3 w-full sm:w-40 border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">All Books</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {loading ? "..." : totalBooks}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;