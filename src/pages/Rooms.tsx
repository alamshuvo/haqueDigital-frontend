/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useDeleteRoomMutation, useGetRoomsQuery } from "../redux/api/api";
import Loading from "../components/ui/Loading";
import type { Room } from "../interface/BookingSummary";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const Rooms = () => {
    const [deleteRoom, { isLoading: isDeleting }] = useDeleteRoomMutation(); // ✅ call hook at top level
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const skip = (page - 1) * limit;

  const { data: roomsData, error, isLoading } = useGetRoomsQuery({ limit, skip, page });

 
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = (room: Room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRoom) return;

    try {
      await deleteRoom(selectedRoom._id).unwrap(); // ✅ call mutation function here
      toast.success(`Room ${selectedRoom.roomNo} deleted successfully!`);
      setShowModal(false);
      setSelectedRoom(null);
    } catch (err: any) {
      toast.error(`Failed to delete room: ${err.data?.message || err.message}`);
    }
  };


  const handleCancel = () => {
    setShowModal(false);
    setSelectedRoom(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-semibold text-red-500">Error fetching rooms.</p>
      </div>
    );
  }

  if (!roomsData || roomsData.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-semibold text-gray-700">No rooms found.</p>
      </div>
    );
  }

  const rooms = roomsData.data;
  const isNextDisabled = rooms.length < limit;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 min-h-screen p-8 font-sans relative"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8 italic">
          All Rooms
        </h1>

        {/* Desktop Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hidden md:block">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Room No</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Beds</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price/Night</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Availability</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rooms.map((room: Room) => (
                  <tr key={room._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{room.roomNo}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{room.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{room.beds}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">${room.pricePerNight}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${room.available === "available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {room.available}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button className="text-orange-500 font-semibold text-sm cursor-not-allowed">Edit</button>
                      <button
                        onClick={() => handleDeleteClick(room)}
                        className={`text-red-500 font-semibold text-sm ${room.available === "booked" ? "cursor-not-allowed opacity-50" : ""}`}
                      >
                        Delete
                      </button>
                      <button
                        className={`px-3 py-1 rounded-full text-white font-semibold text-sm 
                          ${room.available === "available" ? "bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}
                      >
                        Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
          {rooms.map((room: Room) => (
            <motion.div
              key={room._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col space-y-3"
            >
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-xl font-bold text-gray-900">Room {room.roomNo}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full
                  ${room.available === "available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {room.available}
                </span>
              </div>
              <div className="text-sm">Type: {room.type}</div>
              <div className="text-sm">Beds: {room.beds}</div>
              <div className="text-sm">Price/Night: ${room.pricePerNight}</div>
              <div className="flex justify-end space-x-2 mt-4">
                <button className="px-3 py-1 rounded-full text-sm font-semibold text-orange-500 border border-orange-500 cursor-not-allowed">Edit</button>
                <button
                  onClick={() => handleDeleteClick(room)}
                  className={`text-red-500 font-semibold text-sm ${room.available === "booked" ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  Delete
                </button>
                <button className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${room.available === "available" ? "bg-green-400" : "bg-gray-400 cursor-not-allowed"}`}>
                  Book
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-full text-white font-semibold transition
              ${page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`}
          >
            Previous
          </button>
          <span className="text-lg font-bold text-gray-700">Page {page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={isNextDisabled}
            className={`px-4 py-2 rounded-full text-white font-semibold transition
              ${isNextDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 w-96"
            >
              <h2 className="text-xl mb-4 italic font-semibold">Confirm Delete</h2>
              <p className="mb-6">Are you sure you want to delete room {selectedRoom?.roomNo}?</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Rooms;
