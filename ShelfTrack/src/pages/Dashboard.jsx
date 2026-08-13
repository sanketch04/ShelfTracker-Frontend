import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  BookOpen,
  BookMarked,
  CheckCircle,
  Package,
  AlertTriangle,
  Users,
} from "lucide-react";

import { getAllBooks } from "../api/BookServices/bookAxios";
import { getAllMembers } from "../api/BookServices/memberAxios";

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
          (total, book) =>
            total + (book.issuedStock || 0),
          0
        );

      
        const availableBooksCount = items.reduce(
          (total, book) =>
            total + (book.availableStock || 0),
          0
        );

        
        const totalStockCount = items.reduce(
          (total, book) =>
            total + (book.totalStock || 0),
          0
        );

               const memberData = await getAllMembers(
          "",
          null,
          1,
          1
        );

      
        setStats({
          allBooksCount:
            bookData?.totalCount || 0,

          issuedBooksCount,

          availableBooksCount,

          totalStockCount,

          
          overdueCount: 0,

         
          membersCount:
            memberData?.totalCount || 0,
        });
      } catch (error) {
        console.error(
          "Dashboard error:",
          error
        );

        toast.error(
          "Failed to load dashboard statistics."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);


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
    <div className="w-full p-0">

     
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">

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
                transition-all
                duration-200
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
                <Icon
                  size={18}
                  strokeWidth={2}
                  className={card.text}
                />
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default Dashboard;