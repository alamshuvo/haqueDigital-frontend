import { createBrowserRouter } from "react-router-dom";

import Rooms from "../pages/Rooms";
import MainLayout from "../Layout/MainLayout";
import  Home from "../pages/Home";
import CreateRoom from "../pages/CreateRoom";
import BookingSummary from "../pages/BookingSummary";
import ContactPage from "../pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element:<Home></Home>,
      },
      {
        path: "/rooms",
        element: <Rooms></Rooms>,
      },
      {
        path:"/create-room",
        element:<CreateRoom></CreateRoom>
      },
      {
        path:"/booking-summary",
        element:<BookingSummary></BookingSummary>
      },
      {
        path:"/contact",
        element:<ContactPage></ContactPage>
      }
    ],
  },
]);

export default router;
