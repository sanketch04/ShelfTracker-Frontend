import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  BookOpen,
  BookMarked,
  CheckCircle,
  Package,
  AlertTriangle,
  Users,
  History,
  RotateCcw,
  BookCopy,
  UserRound,
} from "lucide-react";

import { getAllBooks } from "../api/BookServices/bookAxios";
import { getAllMembers } from "../api/MemberServices/memberAxios";
import api from "../api/axios.js";

const Dashboard = () => {
  const [stats, setStats] = useState({
    allBooksCount: 0,
    issuedBooksCount: 0,
    availableBooksCount: 0,
    totalStockCount: 0,
    overdueCount: 0,
    membersCount: 0,
  });

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

<<<<<<< HEAD
  useEffect(() => {
    const fetchDashboardStats = async () => {
      setLoading(true);

      try {
        const bookData = await getAllBooks(
          "",
          "",
          null,
          "",
          "asc",
          1,
          100000
        );

        const items = bookData?.items || [];

        const issuedBooksCount = items.reduce(
          (total, book) => total + (book.issuedStock || 0),
          0
        );

        const availableBooksCount = items.reduce(
          (total, book) => total + (book.availableStock || 0),
          0
        );

        const totalStockCount = items.reduce(
          (total, book) => total + (book.totalStock || 0),
          0
        );

        const memberData = await getAllMembers("", null, 1, 1);

        setStats({
          allBooksCount: bookData?.totalCount || 0,
          issuedBooksCount,
          availableBooksCount,
          totalStockCount,
          overdueCount: 0,
          membersCount: memberData?.totalCount || 0,
        });
      } catch (error) {
        console.error("Dashboard error:", error);
        toast.error("Failed to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };

=======
  // =====================================================
  // FETCH DASHBOARD STATS
  // =====================================================

  useEffect(() => {
>>>>>>> d45039231304641afb72877229e4c22f6b1de9e9
    fetchDashboardStats();
    fetchIssueHistory();
  }, []);

<<<<<<< HEAD
=======
  const fetchDashboardStats = async () => {
    setLoading(true);

    try {
      // =================================================
      // BOOK API
      // =================================================

      const bookData = await getAllBooks(
        "",
        "",
        null,
        "",
        "asc",
        1,
        100000
      );

      const items = bookData?.items || [];

      // =================================================
      // ISSUED
      // =================================================

      const issuedBooksCount = items.reduce(
        (total, book) => total + (book.issuedStock || 0),
        0
      );

      // =================================================
      // AVAILABLE
      // =================================================

      const availableBooksCount = items.reduce(
        (total, book) => total + (book.availableStock || 0),
        0
      );

      // =================================================
      // TOTAL STOCK
      // =================================================

      const totalStockCount = items.reduce(
        (total, book) => total + (book.totalStock || 0),
        0
      );

      // =================================================
      // MEMBERS
      // =================================================

      const memberData = await getAllMembers(
        "",
        null,
        1,
        1
      );

      // =================================================
      // OVERDUE
      // GET /api/Issue/overdue-count
      // =================================================

      const overdueResponse = await api.get(
        "/Issue/overdue-count"
      );

      const overdueCount = overdueResponse.data || 0;

      // =================================================
      // SET STATS
      // =================================================

      setStats({
        allBooksCount: bookData?.totalCount || 0,

        issuedBooksCount,

        availableBooksCount,

        totalStockCount,

        overdueCount,

        membersCount: memberData?.totalCount || 0,
      });
    } catch (error) {
      console.error("Dashboard error:", error);

      toast.error(
        "Failed to load dashboard statistics."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // ISSUE HISTORY
  // =====================================================

  const fetchIssueHistory = async () => {
    setHistoryLoading(true);

    try {
      /*
        IMPORTANT:

        Backend me agar tumhare paas ye API hai:

        GET /api/Issue/history

        to ye chalega.
      */

      const response = await api.get(
        "/Issue/history"
      );

      const data = response.data;

      setHistory(
        Array.isArray(data)
          ? data
          : data?.items || []
      );
    } catch (error) {
      console.error(
        "Issue history error:",
        error
      );

      /*
        Agar abhi history API backend me nahi hai
        to dashboard break nahi hoga.
      */

      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  // =====================================================
  // STAT CARDS
  // =====================================================

>>>>>>> d45039231304641afb72877229e4c22f6b1de9e9
  const cards = [
    {
      title: "All Books",
      value: stats.allBooksCount,
      icon: BookOpen,
      borderColor: "border-l-blue-500",
      accent: "bg-blue-500",
      text: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      title: "Issued Books",
      value: stats.issuedBooksCount,
      icon: BookMarked,
      borderColor: "border-l-amber-500",
      accent: "bg-amber-500",
      text: "text-amber-600",
      iconBg: "bg-amber-50",
    },
    {
      title: "Available Books",
      value: stats.availableBooksCount,
      icon: CheckCircle,
      borderColor: "border-l-emerald-500",
      accent: "bg-emerald-500",
      text: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },
    {
      title: "Total Stock",
      value: stats.totalStockCount,
      icon: Package,
      borderColor: "border-l-indigo-500",
      accent: "bg-indigo-500",
      text: "text-indigo-600",
      iconBg: "bg-indigo-50",
    },
    {
      title: "Overdue Books",
      value: stats.overdueCount,
      icon: AlertTriangle,
      borderColor: "border-l-red-500",
      accent: "bg-red-500",
      text: "text-red-600",
      iconBg: "bg-red-50",
    },
    {
      title: "Members",
      value: stats.membersCount,
      icon: Users,
      borderColor: "border-l-purple-500",
      accent: "bg-purple-500",
      text: "text-purple-600",
      iconBg: "bg-purple-50",
    },
  ];

<<<<<<< HEAD
  return (
    <div className="w-full p-0">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-6">
=======
  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="w-full space-y-4">

      {/* =================================================
          TOP STATISTICS
      ================================================= */}

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-6">

>>>>>>> d45039231304641afb72877229e4c22f6b1de9e9
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
<<<<<<< HEAD
              className={`relative overflow-hidden rounded-lg border border-gray-200 border-l-4 bg-white px-3 py-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${card.borderColor}`}
            >
=======
              className={`
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-gray-100
                border-l-4
                ${card.borderColor}
                bg-white
                px-3
                py-3
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:shadow-md
              `}
            >
              <div className="min-w-0">

                <p className="truncate text-[10px] font-medium uppercase tracking-wide text-gray-400">
                  {card.title}
                </p>

                <p
                  className={`
                    mt-1
                    text-2xl
                    font-bold
                    leading-none
                    ${card.text}
                  `}
                >
                  {loading
                    ? "..."
                    : card.value}
                </p>

              </div>

>>>>>>> d45039231304641afb72877229e4c22f6b1de9e9
              <div
                className={`absolute left-0 top-0 h-full w-1 ${card.accent}`}
              />

              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    {card.title}
                  </p>

                  <p
                    className={`mt-1 text-xl font-bold leading-none ${card.text}`}
                  >
                    {loading ? "..." : card.value}
                  </p>
                </div>

                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${card.iconBg}`}
                >
                  <Icon
                    size={16}
                    strokeWidth={2}
                    className={card.text}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
<<<<<<< HEAD
=======


      {/* =================================================
          MAIN DASHBOARD
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">


        {/* =================================================
            ISSUE DESK
        ================================================= */}

        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Issue Desk
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Manage book issue and return
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
              <BookCopy
                size={18}
                className="text-blue-600"
              />
            </div>

          </div>


          {/* ISSUE COUNT */}

          <div className="mt-4 rounded-lg bg-amber-50 p-3">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-500">
                  Currently Issued
                </p>

                <p className="mt-1 text-xl font-bold text-amber-500">
                  {loading
                    ? "..."
                    : stats.issuedBooksCount}
                </p>
              </div>

              <BookMarked
                size={22}
                className="text-amber-500"
              />

            </div>

          </div>


          {/* OVERDUE */}

          <div className="mt-3 rounded-lg bg-red-50 p-3">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-500">
                  Overdue
                </p>

                <p className="mt-1 text-xl font-bold text-red-600">
                  {loading
                    ? "..."
                    : stats.overdueCount}
                </p>
              </div>

              <AlertTriangle
                size={22}
                className="text-red-600"
              />

            </div>

          </div>


          {/* ISSUE BUTTON */}

          <button
            type="button"
            onClick={() => {
              window.location.href =
                "/issue-desk";
            }}
            className="
              mt-4
              w-full
              rounded-lg
              bg-blue-600
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-blue-700
            "
          >
            Open Issue Desk
          </button>

        </div>


        {/* =================================================
            ISSUE HISTORY
        ================================================= */}

        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm lg:col-span-2">

          {/* HEADER */}

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-base font-semibold text-gray-800">
                Issue History
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Recent book issue and return records
              </p>

            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">

              <History
                size={18}
                className="text-indigo-600"
              />

            </div>

          </div>


          {/* HISTORY TABLE */}

          <div className="mt-4 overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-gray-100">

                  <th className="px-2 py-2 text-[10px] font-semibold uppercase text-gray-400">
                    Book
                  </th>

                  <th className="px-2 py-2 text-[10px] font-semibold uppercase text-gray-400">
                    Member
                  </th>

                  <th className="px-2 py-2 text-[10px] font-semibold uppercase text-gray-400">
                    Due Date
                  </th>

                  <th className="px-2 py-2 text-[10px] font-semibold uppercase text-gray-400">
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {historyLoading ? (

                  <tr>

                    <td
                      colSpan="4"
                      className="px-2 py-8 text-center text-sm text-gray-400"
                    >
                      Loading history...
                    </td>

                  </tr>

                ) : history.length === 0 ? (

                  <tr>

                    <td
                      colSpan="4"
                      className="px-2 py-8 text-center text-sm text-gray-400"
                    >
                      No issue history found.
                    </td>

                  </tr>

                ) : (

                  history.slice(0, 5).map((item) => {

                    const isReturned =
                      item.returnedAt;

                    const isOverdue =
                      !isReturned &&
                      item.dueDate &&
                      new Date(item.dueDate) <
                        new Date();

                    return (

                      <tr
                        key={item.id}
                        className="border-b border-gray-50 last:border-0"
                      >

                        {/* BOOK */}

                        <td className="px-2 py-3">

                          <div className="flex items-center gap-2">

                            <BookOpen
                              size={15}
                              className="text-gray-400"
                            />

                            <span className="max-w-[150px] truncate text-xs font-medium text-gray-700">
                              {item.bookTitle ||
                                item.title ||
                                "Book"}
                            </span>

                          </div>

                        </td>


                        {/* MEMBER */}

                        <td className="px-2 py-3">

                          <div className="flex items-center gap-2">

                            <UserRound
                              size={14}
                              className="text-gray-400"
                            />

                            <span className="text-xs text-gray-600">
                              {item.memberName ||
                                "Member"}
                            </span>

                          </div>

                        </td>


                        {/* DUE DATE */}

                        <td className="px-2 py-3">

                          <span className="text-xs text-gray-500">
                            {item.dueDate
                              ? new Date(
                                  item.dueDate
                                ).toLocaleDateString()
                              : "-"}
                          </span>

                        </td>


                        {/* STATUS */}

                        <td className="px-2 py-3">

                          {isReturned ? (

                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-600">

                              <RotateCcw size={11} />

                              Returned

                            </span>

                          ) : isOverdue ? (

                            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-[10px] font-medium text-red-600">

                              <AlertTriangle size={11} />

                              Overdue

                            </span>

                          ) : (

                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[10px] font-medium text-amber-600">

                              <BookMarked size={11} />

                              Issued

                            </span>

                          )}

                        </td>

                      </tr>

                    );
                  })

                )}

              </tbody>

            </table>

          </div>


          {/* VIEW ALL */}

         

        </div>

      </div>

>>>>>>> d45039231304641afb72877229e4c22f6b1de9e9
    </div>
  );
};

export default Dashboard;