import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8001/api/" }),
  tagTypes: ["Room"], // ✅ add tagTypes for invalidation
  endpoints: (builder) => ({
    // Get Rooms with params
    getRooms: builder.query({
      query: ({ limit, page }) => ({
        url: "rooms",
        params: { limit, page },
      }),
      providesTags: (result) =>
        result
          ? [...result.data.map(({ _id }) => ({ type: "Room" as const, id: _id })), { type: "Room", id: "LIST" }]
          : [{ type: "Room", id: "LIST" }],
    }),

    // Booking summary
    bookingSummary: builder.query({
      query: ({ limit, page }) => ({
        url: "bookings/summary",
        params: { limit, page },
      }),
    }),

    // Create booking
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "bookings",
        method: "POST",
        body: bookingData,
      }),
    }),

    // Create room
    createRoom: builder.mutation({
      query: (roomsData) => ({
        url: "rooms",
        method: "POST",
        body: roomsData,
      }),
      invalidatesTags: [{ type: "Room", id: "LIST" }],
    }),

    // ✅ Delete room by ID
    deleteRoom: builder.mutation({
      query: (id: string) => ({
        url: `rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Room", id }],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useCreateBookingMutation,
  useCreateRoomMutation,
  useBookingSummaryQuery,
  useDeleteRoomMutation, // ✅ added delete hook
} = api;
