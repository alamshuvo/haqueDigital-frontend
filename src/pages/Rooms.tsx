/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import {
  useDeleteRoomMutation,
  useGetRoomsQuery,
  useEditRoomMutation,
  useCreateBookingMutation,
} from "../redux/api/api";
import Loading from "../components/ui/Loading";
import type { Room } from "../interface/BookingSummary";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const Rooms = () => {
  const [deleteRoom, { isLoading: isDeleting }] = useDeleteRoomMutation();
  const [editRoom] = useEditRoomMutation();
  const [bookings,{isLoading:isBooking}] = useCreateBookingMutation();
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  

  const {
    data: roomsData,
    error,
    isLoading,
  } = useGetRoomsQuery({
    limit,
    page,
  });

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    guestName: "",
    nights: 1,
    checkInDate: "",
  });
  const [bookingRoom, setBookingRoom] = useState<Room | null>(null);

  const [formData, setFormData] = useState({
    roomNo: "",
    type: "",
    beds: "",
    pricePerNight: 0,
    description: "",
    available: "available",
  });
  // ===== Open Book Modal =====
  const handleBookClick = (room: Room) => {
    setBookingRoom(room);
    setBookingData({
      guestName: "",
      nights: 1,
      checkInDate: "",
    });
    setShowBookModal(true);
  };
  // ===== Submit Booking =====
  const handleBookSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bookingRoom) return;

    try {
      const payload = {
        roomId: bookingRoom._id,
        guestName: bookingData.guestName,
        nights: bookingData.nights,
        checkInDate: bookingData.checkInDate,
      };

      // TODO: Call your booking API mutation here
      await bookings(payload).unwrap();

      toast.success(`Room ${bookingRoom.roomNo} booked successfully!`);
      setShowBookModal(false);
      setBookingRoom(null);
    } catch (err: any) {
      toast.error(`Failed to book room: ${err.data?.message || err.message}`);
    }
  };
  // ===== Delete handlers =====
  const handleDeleteClick = (room: Room) => {
    setSelectedRoom(room);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRoom) return;
    try {
      await deleteRoom(selectedRoom._id).unwrap();
      toast.success(`Room ${selectedRoom.roomNo} deleted successfully!`);
      setShowDeleteModal(false);
      setSelectedRoom(null);
    } catch (err: any) {
      toast.error(`Failed to delete room: ${err.data?.message || err.message}`);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedRoom(null);
  };

  // ===== Edit handlers =====
  const handleEditClick = (room: Room) => {
    setSelectedRoom(room);
    setFormData({
      roomNo: room.roomNo,
      type: room.type,
      beds: room.beds.toString(),
      pricePerNight: Number(room.pricePerNight),
      description: room.description,
      available: room.available,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedRoom) return;

    try {
      const payload = {
        ...formData,
        beds: formData.beds.toString(),
        pricePerNight: Number(formData.pricePerNight),
      };

      await editRoom({
        id: selectedRoom._id,
        roomData: {
          ...payload,
          available: payload.available as
            | "available"
            | "unavailable"
            | "booked",
        },
      }).unwrap();

      toast.success(`Room ${selectedRoom.roomNo} updated successfully!`);
      setShowEditModal(false);
      setSelectedRoom(null);
    } catch (err: any) {
      toast.error(`Failed to update room: ${err.data?.message || err.message}`);
    }
  };

  if (isLoading||isBooking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-semibold text-red-500">
          Error fetching rooms.
        </p>
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
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="mb-6 text-center text-gray-700 italic text-lg max-w-3xl mx-auto"
>
  Welcome to our exquisite collection of rooms, thoughtfully designed to cater to every traveler’s needs.  
  From cozy standard rooms to luxurious suites, each space combines comfort, style, and modern amenities.  
  Whether you are here for business, a family getaway, or a romantic escape, our rooms ensure a relaxing and memorable stay.  
  Enjoy a peaceful ambiance, convenient facilities, and exceptional service during your visit.
</motion.div>

        {/* Desktop Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hidden md:block">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Room No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Beds
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Price/Night
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rooms.map((room: Room) => (
                  <tr key={room._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {room.roomNo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {room.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {room.beds}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      ${room.pricePerNight}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          room.available === "available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {room.available}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() => handleEditClick(room)}
                        className="text-orange-500 font-semibold text-sm hover:text-orange-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(room)}
                        disabled={room.available !== "available"}
                        className={`text-red-500 font-semibold text-sm ${
                          room.available !== "available"
                            ? "cursor-not-allowed opacity-50"
                            : "hover:text-red-600"
                        }`}
                      >
                        Delete
                      </button>
                      {room.available === "booked" ? (
                        <button className=" font-semibold text-sm text-orange-500">Already Booked</button>
                      ) : (
                        <button
                          onClick={() => handleBookClick(room)}
                          className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${
                            room.available === "available"
                              ? "bg-green-400"
                              : "bg-gray-400 cursor-not-allowed disabled"
                          }`}
                        >
                          Book
                        </button>
                      )}
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
                <h3 className="text-xl font-bold text-gray-900">
                  Room {room.roomNo}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    room.available === "available"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {room.available}
                </span>
              </div>
              <div className="text-sm">Type: {room.type}</div>
              <div className="text-sm">Beds: {room.beds}</div>
              <div className="text-sm">Price/Night: ${room.pricePerNight}</div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => handleEditClick(room)}
                  className="px-3 py-1 rounded-full text-sm font-semibold text-orange-500 border border-orange-500 cursor-not-allowed"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(room)}
                  disabled={room.available !== "available"}
                  className={`text-red-500 font-semibold text-sm ${
                    room.available !== "available"
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                >
                  Delete
                </button>
                {room.available === "booked" ? (
                  <button className="font-semibold text-sm text-orange-500">Already Booked</button>
                ) : (
                  <button
                    onClick={() => handleBookClick(room)}
                    className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${
                      room.available === "available"
                        ? "bg-green-400"
                        : "bg-gray-400 cursor-not-allowed disabled"
                    }`}
                  >
                    Book
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-full text-white font-semibold transition ${
              page === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            Previous
          </button>
          <span className="text-lg font-bold text-gray-700">Page {page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={isNextDisabled}
            className={`px-4 py-2 rounded-full text-white font-semibold transition ${
              isNextDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
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
              <h2 className="text-xl mb-4 italic font-semibold">
                Confirm Delete
              </h2>
              <p className="mb-6">
                Are you sure you want to delete room {selectedRoom?.roomNo}?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancelDelete}
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

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.form
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleEditSubmit}
              className="bg-white rounded-2xl shadow-md w-full max-w-md md:w-96 p-6 md:p-8 flex flex-col space-y-6 
                   max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2 italic">
                Edit Room
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Room Number
                  </label>
                  <input
                    type="text"
                    name="roomNo"
                    value={formData.roomNo}
                    onChange={(e) =>
                      setFormData({ ...formData, roomNo: e.target.value })
                    }
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-orange-500 focus:ring-0 outline-none py-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Room Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-orange-500 focus:ring-0 outline-none py-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Beds
                  </label>
                  <input
                    type="number"
                    name="beds"
                    value={formData.beds}
                    onChange={(e) =>
                      setFormData({ ...formData, beds: e.target.value })
                    }
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-orange-500 focus:ring-0 outline-none py-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price Per Night ($)
                  </label>
                  <input
                    type="number"
                    name="pricePerNight"
                    value={formData.pricePerNight}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pricePerNight: Number(e.target.value),
                      })
                    }
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-orange-500 focus:ring-0 outline-none py-1"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Availability
                  </label>
                  <select
                    name="available"
                    value={formData.available}
                    onChange={(e) =>
                      setFormData({ ...formData, available: e.target.value })
                    }
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-orange-500 focus:ring-0 outline-none py-1"
                  >
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-orange-500 focus:ring-0 outline-none py-1"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-400 transition-colors"
                >
                  Update Room
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book Modal */}
      <AnimatePresence>
        {showBookModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.form
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleBookSubmit}
              className="bg-white rounded-2xl shadow-md w-full max-w-md md:w-96 p-6 md:p-8 flex flex-col space-y-6 
                 max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2 italic">
                Book Room {bookingRoom?.roomNo}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Guest Name
                  </label>
                  <input
                    type="text"
                    name="guestName"
                    value={bookingData.guestName}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        guestName: e.target.value,
                      })
                    }
                    required
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-green-500 focus:ring-0 outline-none py-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nights
                  </label>
                  <input
                    type="number"
                    name="nights"
                    min={1}
                    value={bookingData.nights}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        nights: Number(e.target.value),
                      })
                    }
                    required
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-green-500 focus:ring-0 outline-none py-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    name="checkInDate"
                    value={bookingData.checkInDate}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        checkInDate: e.target.value,
                      })
                    }
                    required
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-green-500 focus:ring-0 outline-none py-1"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowBookModal(false)}
                  className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Rooms;
