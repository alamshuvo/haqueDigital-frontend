export interface Room {
    _id: string;
    roomNo: string;
    type: string;
    beds: number | string; // depending on how backend stores it
    pricePerNight: number;
    description: string;
    available: "available" | "unavailable" | "booked";
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface Booking {
    _id: string;
    roomId: Room;
    guestName: string;
    nights: number;
    checkInDate: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  