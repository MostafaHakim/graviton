import React, { useState, useEffect } from "react";
import {
  Search,
  Mail,
  Phone,
  User,
  Calendar,
  MessageSquare,
  Trash2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, getContact } from "../store/features/auth/contactSlice";
import DeleteModal from "../components/DeleteModal";

const VisitorMessages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const messagesPerPage = 12;
  const { contacts, loading } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContact());
  }, [dispatch]);

  // Filter messages based on search
  const filteredMessages = contacts?.filter((message) => {
    const matchesSearch =
      message?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message?.phone?.includes(searchTerm) ||
      message?.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message?.message?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Pagination
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages =
    filteredMessages?.slice(indexOfFirstMessage, indexOfLastMessage) || [];
  const totalPages = Math.ceil(
    (filteredMessages?.length || 0) / messagesPerPage,
  );

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

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Handle card click
  const handleCardClick = (message) => {
    console.log("Card clicked:", message);
    setSelectedMessage(message);
    setShowMessageModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowMessageModal(false);
    setSelectedMessage(null);
  };
  const handleDelete = async (id) => {
    const res = await dispatch(deleteContact(id));
    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getContact());
      setShowDeleteModal(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl text-black font-kalpurush">
            Loading Messages...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 font-kalpurush">
                Visitor Messages
              </h1>
              <div className="w-20 h-1 bg-white mb-4"></div>
              <p className="text-gray-300 text-base font-kalpurush">
                Total {filteredMessages?.length || 0} messages found
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mt-4 md:mt-0">
              <div className="bg-white/10 p-3 rounded text-center">
                <p className="text-2xl font-bold text-white">
                  {contacts?.length || 0}
                </p>
                <p className="text-xs text-gray-300 font-kalpurush">Total</p>
              </div>
              <div className="bg-white/10 p-3 rounded text-center">
                <p className="text-2xl font-bold text-white">
                  {filteredMessages?.length || 0}
                </p>
                <p className="text-xs text-gray-300 font-kalpurush">Filtered</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Search and Actions */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
          <div className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, subject or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Grid */}
        {currentMessages.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {currentMessages.map((message, index) => (
                <div
                  key={message._id}
                  className="group relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  {/* Card Header */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-br from-gray-900 to-black opacity-90 rounded-t-lg"></div>
                  <button
                    onClick={() => setShowDeleteModal(message._id)}
                    className="absolute top-0 right-0 p-2 cursor-pointer"
                  >
                    <Trash2 color="white" size={16} />
                  </button>
                  {/* Profile Initials */}
                  <div className="relative z-10 flex justify-center mt-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-2 border-white shadow-md overflow-hidden bg-gradient-to-br from-gray-700 to-black flex items-center justify-center">
                        <span className="text-xl text-white font-bold">
                          {getInitials(message.name)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="px-3 pb-4 pt-2 text-center">
                    <h3 className="text-sm font-bold text-gray-900 mb-1 truncate">
                      {message.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2 truncate">
                      Subject: {message.subject}
                    </p>
                    <div className="bg-gray-50 rounded p-2 mb-2">
                      <p className="text-xs text-gray-600 line-clamp-2 italic">
                        "{message.message}"
                      </p>
                    </div>
                    <div className="space-y-1 text-left">
                      <div className="flex items-center text-xs">
                        <Mail className="w-3 h-3 text-gray-400 mr-1 flex-shrink-0" />
                        <span className="text-gray-600 truncate">
                          {message.email}
                        </span>
                      </div>
                      <div className="flex items-center text-xs">
                        <Phone className="w-3 h-3 text-gray-400 mr-1 flex-shrink-0" />
                        <span className="text-gray-600">{message.phone}</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <Calendar className="w-3 h-3 text-gray-400 mr-1 flex-shrink-0" />
                        <span className="text-gray-500 text-[10px]">
                          {formatDate(message.createdAt)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCardClick(message)}
                      className="mt-3 w-full bg-black text-white text-xs py-1.5 rounded hover:bg-gray-800 transition-colors duration-200"
                    >
                      View Details
                    </button>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
                    #{indexOfFirstMessage + index + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 px-4 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
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
                    className="p-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          // Empty State
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
            <MessageSquare className="mx-auto h-16 w-16 text-gray-300" />
            <h3 className="mt-4 text-xl font-medium text-gray-900 font-kalpurush">
              No messages found
            </h3>
          </div>
        )}
      </div>

      {/* Message Detail Modal - Simplified */}
      {showMessageModal && selectedMessage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity"
              onClick={handleCloseModal}
            ></div>

            {/* Modal Panel */}
            <div className="relative bg-white rounded-lg max-w-2xl w-full mx-auto shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Message Details
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {/* ID */}
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Message ID
                  </label>
                  <p className="text-sm font-mono bg-gray-50 p-2 rounded border">
                    {selectedMessage._id}
                  </p>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Name
                    </label>
                    <p className="text-sm bg-gray-50 p-2 rounded border">
                      {selectedMessage.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Phone
                    </label>
                    <p className="text-sm bg-gray-50 p-2 rounded border">
                      {selectedMessage.phone}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Email
                  </label>
                  <p className="text-sm bg-gray-50 p-2 rounded border break-all">
                    {selectedMessage.email}
                  </p>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Subject
                  </label>
                  <p className="text-sm bg-gray-50 p-2 rounded border">
                    {selectedMessage.subject}
                  </p>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Message
                  </label>
                  <p className="text-sm bg-gray-50 p-4 rounded border min-h-[100px]">
                    {selectedMessage.message}
                  </p>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                  <div>
                    <span className="block font-medium">Created:</span>
                    {formatDate(selectedMessage.createdAt)}
                  </div>
                  <div>
                    <span className="block font-medium">Updated:</span>
                    {formatDate(selectedMessage.updatedAt)}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100"
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
            title={`Are you sure to delete this massage`}
            onDelete={handleDelete}
            onClose={() => setShowDeleteModal(null)}
            id={showDeleteModal}
          />
        </div>
      )}
    </div>
  );
};

export default VisitorMessages;
