import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../api/MemberServices/memberAxios";

import MemberTable from "../components/members/MemberTable";
import MemberPagination from "../components/members/MemberPagination";
import MemberFormModal from "../components/members/MemberFormModal";
import DeleteMemberModal from "../components/members/DeleteMemberModal";

const ManageMembers = () => {

  // MEMBERS
  const [members, setMembers] = useState([]);

  // LOADING
  const [loading, setLoading] = useState(false);

  // SEARCH
  const [searchTerm, setSearchTerm] = useState("");

  // PAGINATION
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [deletingMemberId, setDeletingMemberId] = useState(null);

  // FORM
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    gender: 0,
    status: 0,
  });

  // GET MEMBERS
  const fetchMembers = async () => {
    setLoading(true);

    try {
      const data = await getAllMembers(
        searchTerm.trim(),
        pageNumber,
        pageSize
      );

      setMembers(data?.items || []);
      setTotalCount(data?.totalCount || 0);
      setTotalPages(data?.totalPages || 1);

    } catch (error) {
      console.error(error);

      setMembers([]);
      setTotalCount(0);
      setTotalPages(1);

      toast.error("Failed to load members.");
    } finally {
      setLoading(false);
    }
  };

  // INITIAL LOAD + SEARCH + PAGE CHANGE
  useEffect(() => {
    fetchMembers();
  }, [searchTerm, pageNumber]);

  // SEARCH
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setPageNumber(1);
  };

  // FORM INPUT
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        name === "gender" || name === "status"
          ? Number(value)
          : value,
    }));
  };

  // OPEN ADD MODAL
  const handleOpenAddModal = () => {
    setEditingMemberId(null);

    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      gender: 0,
      status: 0,
    });

    setIsModalOpen(true);
  };

  // OPEN EDIT MODAL
  const handleOpenEditModal = (member) => {
    setEditingMemberId(member.id);

    setFormData({
      name: member.name || "",
      email: member.email || "",
      phoneNumber: member.phoneNumber || "",
      gender: member.gender ?? 0,
      status: member.status ?? 0,
    });

    setIsModalOpen(true);
  };

  // CLOSE MODAL
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMemberId(null);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingMemberId) {

        await updateMember(
          editingMemberId,
          formData
        );

        toast.success(
          "Member updated successfully!"
        );

      } else {

        await createMember(formData);

        toast.success(
          "Member added successfully!"
        );
      }

      handleCloseModal();

      await fetchMembers();

    } catch (error) {

      console.error(error);

      const serverMessage =
        error?.response?.data?.message;

      toast.error(
        serverMessage ||
        "Operation failed. Please try again."
      );
    }
  };

  // DELETE
  const handleDelete = async () => {

    if (!deletingMemberId) {
      return;
    }

    try {

      await deleteMember(deletingMemberId);

      toast.success(
        "Member deleted successfully!"
      );

      setDeletingMemberId(null);

      // If last member of page deleted
      if (
        members.length === 1 &&
        pageNumber > 1
      ) {

        setPageNumber(
          (previous) => previous - 1
        );

      } else {

        await fetchMembers();
      }

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Failed to delete member."
      );
    }
  };

  // PREVIOUS PAGE
  const handlePreviousPage = () => {

    if (pageNumber > 1) {

      setPageNumber(
        (previous) => previous - 1
      );
    }
  };

  // NEXT PAGE
  const handleNextPage = () => {

    if (pageNumber < totalPages) {

      setPageNumber(
        (previous) => previous + 1
      );
    }
  };

  return (

    <div className="min-h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">

      {/* PAGE HEADER */}
      <div className="mb-6">

        <h1 className="text-2xl font-bold text-gray-800">
          Manage Members
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage library members and their information.
        </p>

      </div>


      {/* TOP SECTION */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* TOTAL MEMBERS CARD */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Total Members
              </p>

              <h2 className="mt-2 text-3xl font-bold text-blue-600">
                {totalCount}
              </h2>

            </div>


            {/* ICON */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-8a4 4 0 110 8 4 4 0 000-8zm6 4a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>

            </div>

          </div>

        </div>

      </div>


      {/* MAIN CARD */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        {/* SEARCH + ADD */}
        <div className="border-b border-gray-200 px-5 py-4">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            {/* SEARCH */}
            <div className="relative w-full md:max-w-md">

              {/* SEARCH ICON */}
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m2.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                  />
                </svg>

              </div>


              <input
                type="text"
                placeholder="Search member by name..."
                value={searchTerm}
                onChange={(e) =>
                  handleSearchChange(e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>


            {/* ADD BUTTON */}
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >

              <span className="text-lg leading-none">
                +
              </span>

              Add Member

            </button>

          </div>

        </div>


        {/* TABLE */}
        <MemberTable
          members={members}
          loading={loading}
          onEdit={handleOpenEditModal}
          onDelete={setDeletingMemberId}
        />


        {/* PAGINATION */}
        <MemberPagination
          pageNumber={pageNumber}
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={pageSize}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
        />

      </div>


      {/* FORM MODAL */}
      <MemberFormModal
        isOpen={isModalOpen}
        editingMemberId={editingMemberId}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
      />


      {/* DELETE MODAL */}
      <DeleteMemberModal
        deletingMemberId={deletingMemberId}
        onCancel={() =>
          setDeletingMemberId(null)
        }
        onConfirm={handleDelete}
      />

    </div>
  );
};

export default ManageMembers;