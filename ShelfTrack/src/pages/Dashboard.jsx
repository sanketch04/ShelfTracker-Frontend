import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getAllBooks } from "../api/BookServices/bookAxios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    allBooksCount: 0,
    issuedBooksCount: 0,
    availableBooksCount: 0,
    totalStockCount: 0,
    overdueCount: 0,
    membersCount: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setLoading(true);

      try {
        // Get all books
        const data = await getAllBooks(
          "",
          "",
          null,
          "",
          "asc",
          1,
          100000
        );

        const items = data?.items || [];

        // Issued Books
        const issuedBooksCount = items.reduce(
          (total, book) => total + (book.issuedStock || 0),
          0
        );

        // Available Books
        const availableBooksCount = items.reduce(
          (total, book) => total + (book.availableStock || 0),
          0
        );

        // Total Stock
        const totalStockCount = items.reduce(
          (total, book) => total + (book.totalStock || 0),
          0
        );

        setStats({
          allBooksCount: data?.totalCount || 0,
          issuedBooksCount,
          availableBooksCount,
          totalStockCount,

          // TODO:
          // Replace these with Member API and Overdue API values
          overdueCount: 0,
          membersCount: 0,
        });
      } catch (error) {
        console.error("Dashboard error:", error);

        toast.error("Failed to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="w-full p-0">

      {/* Dashboard Heading */}
      {/* <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Library overview and statistics
        </p>
      </div> */}

      {/* ================= STAT CARDS ================= */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">

        {/* ================= ALL BOOKS ================= */}
        <div className="group rounded-xl border-l-4 border-blue-500 bg-white px-3 py-3 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                All Books
              </p>

              <p className="mt-1 text-2xl font-bold text-blue-600">
                {loading ? "..." : stats.allBooksCount}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              📚
            </div>
          </div>

        </div>


        {/* ================= ISSUED BOOKS ================= */}
        <div className="group rounded-xl border-l-4 border-amber-500 bg-white px-3 py-3 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Issued
              </p>

              <p className="mt-1 text-2xl font-bold text-amber-500">
                {loading ? "..." : stats.issuedBooksCount}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
              📖
            </div>
          </div>

        </div>


        {/* ================= AVAILABLE BOOKS ================= */}
        <div className="group rounded-xl border-l-4 border-emerald-500 bg-white px-3 py-3 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Available
              </p>

              <p className="mt-1 text-2xl font-bold text-emerald-600">
                {loading ? "..." : stats.availableBooksCount}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              ✅
            </div>
          </div>

        </div>


        {/* ================= TOTAL STOCK ================= */}
        <div className="group rounded-xl border-l-4 border-indigo-500 bg-white px-3 py-3 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Total Stock
              </p>

              <p className="mt-1 text-2xl font-bold text-indigo-600">
                {loading ? "..." : stats.totalStockCount}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              📦
            </div>
          </div>

        </div>


        {/* ================= OVERDUE ================= */}
        <div className="group rounded-xl border-l-4 border-red-500 bg-white px-3 py-3 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Overdue
              </p>

              <p className="mt-1 text-2xl font-bold text-red-600">
                {loading ? "..." : stats.overdueCount}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
              ⚠️
            </div>
          </div>

        </div>


        {/* ================= MEMBERS ================= */}
        <div className="group rounded-xl border-l-4 border-purple-500 bg-white px-3 py-3 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Members
              </p>

              <p className="mt-1 text-2xl font-bold text-purple-600">
                {loading ? "..." : stats.membersCount}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              👥
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;