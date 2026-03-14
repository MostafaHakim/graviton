import React, { useEffect, useState } from "react";
import AboutForm from "../../components/AboutForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createAbout,
  deleteAbout,
  getAbout,
} from "../../store/features/auth/aboutSlice";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Clock,
  Hash,
  FileText,
  Grid,
  List,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import DeleteModal from "../../components/DeleteModal";

const AboutManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [selectedAbout, setSelectedAbout] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { abouts, loading } = useSelector((state) => state.abouts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAbout());
  }, [dispatch]);

  // Filter abouts based on search
  const filteredAbouts = abouts?.filter((about) => {
    return (
      about?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      about?.valus?.some((v) =>
        v.title?.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
      about?.valus?.some((v) =>
        v.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    );
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    filteredAbouts?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil((filteredAbouts?.length || 0) / itemsPerPage);

  const handleAddAbout = async (formData) => {
    const res = await dispatch(createAbout(formData));
    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getAbout());
      setShowModal(false);
      setSelectedAbout(null);
    }
  };

  const handleViewAbout = (about) => {
    setSelectedAbout(about);
    setShowViewModal(true);
  };

  const handleDeleteAbout = async (id) => {
    const res = await dispatch(deleteAbout(id));
    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getAbout());
      setShowDeleteModal(null);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAbout(null);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedAbout(null);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Get initials
  const getInitials = (name) => {
    if (!name) return "AB";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-black border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <h2 className="text-xl text-gray-700 mt-4 font-medium">
            Loading About Contents...
          </h2>
          <p className="text-sm text-gray-500 mt-2">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                About Contents
              </h1>
              <p className="text-gray-500 mt-1">
                Manage your about page content and values
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 md:mt-0 bg-black text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add New Content
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Contents</p>
                <p className="text-2xl font-bold text-gray-900">
                  {abouts?.length || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Values</p>
                <p className="text-2xl font-bold text-gray-900">
                  {abouts?.reduce(
                    (acc, curr) => acc + (curr?.valus?.length || 0),
                    0,
                  ) || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Grid className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                  {abouts?.filter(
                    (a) =>
                      new Date(a?.createdAt) >
                      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                  ).length || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Last Update</p>
                <p className="text-sm font-medium text-gray-900">
                  {abouts?.length > 0
                    ? formatDate(abouts[0]?.updatedAt).split(",")[0]
                    : "N/A"}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and View Toggle */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, title or description..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* About Contents */}
        {currentItems.length > 0 ? (
          <>
            {viewMode === "grid" ? (
              // Grid View
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((about) => (
                  <div
                    key={about._id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
                  >
                    {/* Card Header */}
                    <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {getInitials(about.name)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {about.name}
                            </h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {about.valus?.length || 0} values
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleViewAbout(about)}
                            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowDeleteModal(about._id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      <p className="text-xs text-gray-500 mb-3">
                        Recent Values
                      </p>
                      <div className="space-y-2">
                        {about.valus?.slice(0, 2).map((value, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-50 p-2.5 rounded-lg border border-gray-100"
                          >
                            <p className="text-xs font-medium text-gray-700">
                              {value.title}
                            </p>
                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                              {value.description}
                            </p>
                          </div>
                        ))}
                        {about.valus?.length > 2 && (
                          <p className="text-xs text-center text-gray-400 mt-2">
                            +{about.valus.length - 2} more values
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Hash className="w-3 h-3" />
                          <span>{about._id.slice(-6)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>
                            {formatDate(about.updatedAt).split(",")[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // List View
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Values
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Updated
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentItems.map((about) => (
                      <tr
                        key={about._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                              {getInitials(about.name)}
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {about.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {about.valus?.length || 0} items
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(about.createdAt).split(",")[0]}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(about.updatedAt).split(",")[0]}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleViewAbout(about)}
                              className="p-1.5 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteAbout(about._id)}
                              className="p-1.5 text-gray-400 hover:text-red-500 rounded hover:bg-gray-100"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstItem + 1} to{" "}
                  {Math.min(indexOfLastItem, filteredAbouts.length)} of{" "}
                  {filteredAbouts.length} entries
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          // Empty State
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No About Contents Found
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              {searchTerm
                ? "No results match your search criteria"
                : "Get started by creating your first about content"}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowModal(true)}
                className="bg-black text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors mx-auto"
              >
                <Plus className="w-4 h-4" />
                Add New Content
              </button>
            )}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={handleCloseModal}
              ></div>
              <div className="relative bg-white rounded-2xl max-w-3xl w-full mx-auto shadow-2xl">
                <div className="flex items-center justify-between p-6 border-b">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {selectedAbout
                      ? "Edit About Content"
                      : "Add New About Content"}
                  </h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <AboutForm
                    handleAddAbout={handleAddAbout}
                    initialData={selectedAbout}
                    isEdit={!!selectedAbout}
                    onClose={handleCloseModal}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Modal */}
        {showViewModal && selectedAbout && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={handleCloseViewModal}
              ></div>
              <div className="relative bg-white rounded-2xl max-w-3xl w-full mx-auto shadow-2xl">
                <div className="flex items-center justify-between p-6 border-b">
                  <h3 className="text-xl font-semibold text-gray-900">
                    About Content Details
                  </h3>
                  <button
                    onClick={handleCloseViewModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  {/* Basic Info */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-3">
                      Basic Information
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Name/Title</p>
                        <p className="text-base font-medium text-gray-900">
                          {selectedAbout.name}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            Created At
                          </p>
                          <p className="text-sm text-gray-700">
                            {formatDate(selectedAbout.createdAt)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            Updated At
                          </p>
                          <p className="text-sm text-gray-700">
                            {formatDate(selectedAbout.updatedAt)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">ID</p>
                        <p className="text-xs font-mono text-gray-600 break-all bg-white p-2 rounded border border-gray-200">
                          {selectedAbout._id}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Values Section */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">
                      Values ({selectedAbout.valus?.length || 0})
                    </h4>
                    <div className="space-y-3">
                      {selectedAbout.valus?.map((value, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-4 rounded-xl border border-gray-200"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-medium text-gray-500">
                              Value #{index + 1}
                            </span>
                            <span className="text-xs text-gray-400">
                              {value._id?.slice(-6)}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-900 mb-1">
                            {value.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {value.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 p-6 border-t bg-gray-50">
                  <button
                    onClick={handleCloseViewModal}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showDeleteModal !== null && (
          <div>
            <DeleteModal
              title={"Are you sure to delete"}
              onDelete={handleDeleteAbout}
              onClose={() => setShowDeleteModal(null)}
              id={showDeleteModal}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutManagement;
