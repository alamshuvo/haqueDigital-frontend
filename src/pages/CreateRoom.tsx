/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import { useCreateRoomMutation } from "../redux/api/api";
import Loading from "../components/ui/Loading";

const CreateRoom = () => {
    const [formData, setFormData] = useState({
        roomNo: '',
        type: '',
        beds: '',
        pricePerNight: 0,
        description: '',
        available: 'available',
      });
    
      const [createRoom, { isLoading }] = useCreateRoomMutation();
    
    interface FormData {
        roomNo: string;
        type: string;
        beds: string;
        pricePerNight: number;
        description: string;
        available: string;
    }
    
    interface ChangeEvent {
        target: {
            name: string;
            value: string | number;
            type: string;
        };
    }
    
    const handleChange = (e: ChangeEvent) => {
        const { name, value, type } = e.target;
        setFormData((prevData: FormData) => ({
            ...prevData,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const payload: {
                roomNo: string;
                type: string;
                beds: string;
                pricePerNight: number;
                description: string;
                available: string;
            } = {
                ...formData,
                beds: formData.beds.toString(), // Ensure 'beds' is a string
                pricePerNight: Number(formData.pricePerNight), // Ensure 'pricePerNight' is a number
            };
            await createRoom(payload).unwrap();
            toast.success("Room created successfully!");
            setFormData({
                roomNo: '',
                type: '',
                beds: '',
                pricePerNight: 0,
                description: '',
                available: 'available',
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(`Failed to create room: ${err.data?.message || err.message}`);
        }
    };
    
      if (isLoading) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <Loading />
          </div>
        );
      }
    

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 min-h-screen p-8 font-sans"
    >
      <Toaster position="top-center" richColors />
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">
          Create New Room
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Fill out the form to add a new room to the database
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Room No */}
            <div>
              <label
                htmlFor="roomNo"
                className="block text-sm font-medium text-gray-700"
              >
                Room Number
              </label>
              <input
                type="text"
                name="roomNo"
                id="roomNo"
                value={formData.roomNo}
                onChange={handleChange}
                className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-orange-500 focus:ring-0 outline-none py-1"
                required
              />
            </div>

            {/* Room Type */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Room Type
              </label>
              <input
                type="text"
                name="type"
                id="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-orange-500 focus:ring-0 outline-none py-1"
                required
              />
            </div>

            {/* Beds */}
            <div>
              <label
                htmlFor="beds"
                className="block text-sm font-medium text-gray-700"
              >
                Number of Beds
              </label>
              <input
                type="number"
                name="beds"
                id="beds"
                value={formData.beds || ""}
                onChange={handleChange}
                className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-orange-500 focus:ring-0 outline-none py-1"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="pricePerNight"
                className="block text-sm font-medium text-gray-700"
              >
                Price Per Night ($)
              </label>
              <input
                type="number"
                name="pricePerNight"
                id="pricePerNight"
                value={formData.pricePerNight || ""}
                onChange={handleChange}
                className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-orange-500 focus:ring-0 outline-none py-1"
                required
              />
            </div>

            {/* Availability */}
            <div className="md:col-span-2">
              <label
                htmlFor="available"
                className="block text-sm font-medium text-gray-700"
              >
                Availability
              </label>
              <select
                name="available"
                id="available"
                value={formData.available}
                onChange={handleChange}
                className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-orange-500 focus:ring-0 outline-none py-1"
                required
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-orange-500 focus:ring-0 outline-none py-1"
                required
              />
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-400 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Room"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateRoom;
