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
  Search,
  X,
  Filter,
} from "lucide-react";

import { getAllBooks, getIssueHistory } from "../api/BookServices/bookAxios";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); // "" | "Issued" | "Returned" | "Overdue"
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchIssueHistory(searchQuery, selectedStatus);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedStatus]);

  const fetchDashboardStats = async () => {
    setLoading(true);

    try {
      const bookData = await getAllBooks("", "", null, "", "asc", 1, 100000);
      const items = bookData?.items || [];

      const issuedBooksCount = items.reduce(
        (total, book) => total + (book.issuedStock || 0),
        0,
      );

      const availableBooksCount = items.reduce(
        (total, book) => total + (book.availableStock || 0),
        0,
      );

      const totalStockCount = items.reduce(
        (total, book) => total + (book.totalStock || 0),
        0,
      );

      const memberData = await getAllMembers("", null, 1, 1);

      const overdueResponse = await api.get("/Issue/overdue-count");
      const overdueCount = overdueResponse.data || 0;

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
      toast.error("Failed to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  };

  const fetchIssueHistory = async (search = "", status = "") => {
    setHistoryLoading(true);

    try {
      const data = await getIssueHistory({
        search,
        status,
        sortBy: "issuedAt",
        sortOrder: "desc",
        pageNumber: 1,
        pageSize: 10,
      });

      const historyList = Array.isArray(data) ? data : data?.items || [];
      setHistory(historyList);
    } catch (error) {
      console.error("Issue history error:", error);
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  const cards = [
    {
      title: "All Books",
      value: stats.allBooksCount,
      icon: BookOpen,
      borderColor: "border-l-blue-500",
      text: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      title: "Issued Book",
      value: stats.issuedBooksCount,
      icon: BookMarked,
      borderColor: "border-l-amber-500",
      text: "text-amber-500",
      iconBg: "bg-amber-50",
    },
    {
      title: "Available Book",
      value: stats.availableBooksCount,
      icon: CheckCircle,
      borderColor: "border-l-emerald-500",
      text: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },
    {
      title: "Total Stock",
      value: stats.totalStockCount,
      icon: Package,
      borderColor: "border-l-indigo-500",
      text: "text-indigo-600",
      iconBg: "bg-indigo-50",
    },
    {
      title: "Overdue Book",
      value: stats.overdueCount,
      icon: AlertTriangle,
      borderColor: "border-l-red-500",
      text: "text-red-600",
      iconBg: "bg-red-50",
    },
    {
      title: "Members",
      value: stats.membersCount,
      icon: Users,
      borderColor: "border-l-purple-500",
      text: "text-purple-600",
      iconBg: "bg-purple-50",
    },
  ];


  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
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
                  {loading ? "..." : card.value}
                </p>
              </div>

              <div
                className={`
                  ml-2
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  ${card.iconBg}
                `}
              >
                <Icon size={18} strokeWidth={2} className={card.text} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
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
              <BookCopy size={18} className="text-blue-600" />
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-amber-50 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Currently Issued</p>
                <p className="mt-1 text-xl font-bold text-amber-500">
                  {loading ? "..." : stats.issuedBooksCount}
                </p>
              </div>
              <BookMarked size={22} className="text-amber-500" />
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-red-50 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Overdue</p>
                <p className="mt-1 text-xl font-bold text-red-600">
                  {loading ? "..." : stats.overdueCount}
                </p>
              </div>
              <AlertTriangle size={22} className="text-red-600" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              window.location.href = "/issue-desk";
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
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm lg:col-span-2">
         
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Issue History
              </h2>
              <p className="mt-0.5 text-xs text-gray-400">
                Recent book issue and return records
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
             
              <div className="relative flex-1 sm:flex-initial">
                <Search
                  size={14}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search book or member..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    bg-gray-50
                    py-1.5
                    pl-8
                    pr-7
                    text-xs
                    text-gray-700
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-1
                    focus:ring-blue-500
                    sm:w-44
                  "
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="
                    rounded-lg
                    border
                    border-gray-200
                    bg-gray-50
                    py-1.5
                    px-2.5
                    text-xs
                    text-gray-700
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:bg-white
                  "
                >
                  <option value="">All Status</option>
                  <option value="Issued">Issued</option>
                  <option value="Returned">Returned</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                <History size={16} className="text-indigo-600" />
              </div>
            </div>
          </div>

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
                      {searchQuery || selectedStatus
                        ? "No matching records found."
                        : "No issue history found."}
                    </td>
                  </tr>
                ) : (
                  history.map((item) => {
                    const isReturned =
                      item.returnedAt ||
                      item.status?.toLowerCase() === "returned";

                    const isOverdue =
                      !isReturned &&
                      (item.status?.toLowerCase() === "overdue" ||
                        (item.dueDate && new Date(item.dueDate) < new Date()));

                    return (
                      <tr
                        key={item.id || item.issueId}
                        className="border-b border-gray-50 last:border-0"
                      >
                        {/* BOOK */}
                        <td className="px-2 py-3">
                          <div className="flex items-center gap-2">
                            <BookOpen
                              size={15}
                              className="shrink-0 text-gray-400"
                            />
                            <span className="max-w-[150px] truncate text-xs font-medium text-gray-700">
                              {item.bookTitle || item.title || "Book"}
                            </span>
                          </div>
                        </td>

                        <td className="px-2 py-3">
                          <div className="flex items-center gap-2">
                            <UserRound
                              size={14}
                              className="shrink-0 text-gray-400"
                            />
                            <span className="text-xs text-gray-600">
                              {item.memberName || "Member"}
                            </span>
                          </div>
                        </td>

                       
                        <td className="px-2 py-3">
                          <span className="text-xs text-gray-500">
                            {item.dueDate
                              ? new Date(item.dueDate).toLocaleDateString()
                              : "-"}
                          </span>
                        </td>

                       
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;