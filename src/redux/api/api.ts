import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Room } from "../../interface/BookingSummary";

interface PaginatedRooms {
  length: number;
  data: Room[];
  total: number;
  page: number;
  limit: number;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://haque-digital-backend.vercel.app/api/", credentials: "include" }),
  tagTypes: ["Room", "Booking"],
  endpoints: (builder) => ({
    // Get Rooms with pagination
    getRooms: builder.query<PaginatedRooms, { limit: number; page: number }>({
      query: ({ limit, page }) => ({
        url: "rooms",
        params: { limit, page },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((room) => ({ type: "Room" as const, id: room._id })),
              { type: "Room", id: "LIST" },
            ]
          : [{ type: "Room", id: "LIST" }],
    }),

    // Booking summary
    bookingSummary: builder.query({
      query: ({ limit, page }) => ({
        url: "bookings/summary",
        params: { limit, page },
      }),
      providesTags: [{ type: "Booking", id: "LIST" }],
    }),

    // Create booking
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "bookings",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: [
        { type: "Room", id: "LIST" },
        { type: "Booking", id: "LIST" },
      ],
    }),

    // Create room
    createRoom: builder.mutation({
      query: (roomData) => ({
        url: "rooms",
        method: "POST",
        body: roomData,
      }),
      invalidatesTags: [{ type: "Room", id: "LIST" }],
    }),

    // Edit room
    editRoom: builder.mutation({
      query: ({ id, roomData }: { id: string; roomData: Partial<Room> }) => ({
        url: `rooms/${id}`,
        method: "PATCH",
        body: roomData,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Room", id }],
    }),

    // Delete room
    deleteRoom: builder.mutation({
      query: (id: string) => ({
        url: `rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Room", id }],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useBookingSummaryQuery,
  useCreateBookingMutation,
  useCreateRoomMutation,
  useEditRoomMutation,
  useDeleteRoomMutation,
} = api;
