import React, { useState } from "react";
import { useBookingSummaryQuery } from "../redux/api/api";
import Loading from "../components/ui/Loading";
import type { Booking } from "../interface/BookingSummary";
import { motion } from "framer-motion";

const BookingSummary = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const skip = (page - 1) * limit;
  console.log(limit, skip, page);

  const {
    data: bookingSummaryData,
    error,
    isLoading,
  } = useBookingSummaryQuery({ limit, skip, page });

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
        <p className="text-2xl font-semibold text-red-500">
          Error fetching rooms.
        </p>
      </div>
    );
  }

  if (!bookingSummaryData || bookingSummaryData.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-semibold text-gray-700">No rooms found.</p>
      </div>
    );
  }

  const rooms = bookingSummaryData.data;
  console.log(rooms);
  const isNextDisabled = rooms.length < limit;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 min-h-screen p-8 font-sans"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8 italic">
          All Booking Summary
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          A static view of all available rooms and their status.
        </p>

        {/* Desktop Table View */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hidden md:block">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Room No</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Beds</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price Per Night</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Availability</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">CheckInDate</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Guest Name</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stay Night</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rooms.map((room: Booking) => (
                  <tr key={room._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{room.roomId.roomNo}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{room.roomId.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{room.roomId.beds}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">${room.roomId.pricePerNight}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${room.roomId.available === "available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"}`}
                      >
                        {room.roomId.available}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{room.checkInDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{room.guestName}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{room.nights}</td>
                 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          <div className="grid grid-cols-1 gap-4">
            {rooms.map((room: Booking) => (
              <div key={room._id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="text-xl font-bold text-gray-900">Room {room.roomId.roomNo}</h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full
                      ${room.roomId.available === "available"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"}`}
                  >
                    {room.roomId.available}
                  </span>
                </div>
                <div className="text-sm"><span className="font-semibold">Type:</span> {room.roomId.type}</div>
                <div className="text-sm"><span className="font-semibold">Beds:</span> {room.roomId.beds}</div>
                <div className="text-sm"><span className="font-semibold">Price/Night:</span> {room.roomId.pricePerNight}</div>
                <div className="text-sm"><span className="font-semibold">CheckInDate:</span> {room.checkInDate}</div>
                <div className="text-sm"><span className="font-semibold">Guest Name:</span> {room.guestName}</div>
                <div className="text-sm"><span className="font-semibold">Stay Night:</span> {room.nights}</div>
               
              </div>
            ))}
          </div>
        </div>
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
    </motion.div>
  );
};

export default BookingSummary;
